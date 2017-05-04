function createWindLayerInto(map) {
  var svgLayer = d3.select(map.getPanes().overlayPane).append('svg');
  svgLayer.attr('class', 'leaflet-zoom-hide fill');
  var plotLayer = svgLayer.append('g');

  function putParticle(svgLayer, rect, v) {
    var x = d3.randomUniform(rect.left, rect.right);
    var y = d3.randomUniform(rect.top, rect.bottom);

    var circle = plotLayer.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 2)
      .attr("fill", "#ffb")
      .attr("stroke", "#fb9")
      .attr("class", "particle");

    var translate = "translate(" + Math.round(v.x) + "," + Math.round(v.y) + ")";

    circle.transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("transform", translate)
      .on('end', function () {
        d3.select(this).remove();
      });
  }
  var timers = []
  function clearTimer() {
    timers.forEach(function(timer) {
       clearInterval(timer);
    });
    timers = [];
  }

  function fitLayer() {
    var bounds = map.getBounds();
    var topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
    var bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

    svgLayer.attr("width", bottomRight.x - topLeft.x)
      .attr("height", bottomRight.y - topLeft.y)
      .style("left", topLeft.x + "px")
      .style("top", topLeft.y + "px");

    plotLayer.attr('transform', 'translate('+ -topLeft.x + ',' + -topLeft.y + ')');
  }

  var reset = function() {}

  map.on("zoom", function() {
    reset();
  });

  map.on("moveend", function() {
    reset();
  });

  function loadData(fireData, windData) {

    var bounds = map.getBounds();
    var northWest = bounds.getNorthWest();
    var southEast = bounds.getSouthEast();

    reset = function() {
      clearTimer();
      fitLayer();
      loadData(fireData, windData);
    }

    $.getJSON(windData, function(wind) {
      $.getJSON(fireData, function(data) {
        data.forEach(function(fire) {
          if (northWest.lat < fire.lat || fire.lat < southEast.lat) {
            return;
          }
          if ( fire.lng < northWest.lng || southEast.lng < fire.lng) {
            return;
          }

          var pos = map.latLngToLayerPoint(new L.LatLng(fire.lat, fire.lng));
          var interval = fire.value > 400 ? 1000 : fire.value > 300 ? 5000 - fire.value*10 : 2000

          var size = 5;
          var rect = {left:pos.x-size, top: pos.y-size, right:pos.x + size, bottom:pos.y+size}

          // 風速: ダミー
console.log(fire.lat + ", " + fire.lng)
          var pos = (90-Math.round(fire.lat))*360 + Math.round(fire.lng)
          var v = {
            x: wind[0].data[pos] * 5,
            y: -wind[1].data[pos] * 5 
          };
          timers.push(setInterval(
            function() {
              putParticle(svgLayer, rect, v);
            },
            interval
          ));
        });
      });
    });
  };

  return {
    svgLayer: svgLayer,
    plotLayer: plotLayer,
    loadData: loadData
  }
}
