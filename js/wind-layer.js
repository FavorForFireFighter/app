function createWindLayerInto(map) {
  var svgLayer = d3.select(map.getPanes().overlayPane).append('svg');
  svgLayer.attr('class', 'leaflet-zoom-hide fill');
  var plotLayer = svgLayer.append('g');

  function putParticle(svgLayer, x, y, vx, vy) {

    var circle = svgLayer.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 2)
      .attr("fill", "#ffb")
      .attr("stroke", "#fb9")
      .attr("class", "particle");

    circle.transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("transform", "translate(" + vx + "," + vy + ")")
      .on('end', function () {
        d3.select(this).remove();
      });
  }

  return {
    svgLayer: svgLayer,
    plotLayer: plotLayer,
    loadData: function(fireData, windData) {
      $.getJSON(windData, function(wind) {
        $.getJSON(fireData, function(data) {
          data.forEach(function(fire) {
            var pos = map.latLngToLayerPoint(new L.LatLng(fire.lat, fire.lng));
            var interval = fire.value > 400 ? 10 : fire.value > 300 ? 4000 - fire.value*10 : 1000


            var size = 10;
            var rect = {left:pos.x-size, top: pos.y-size, right:pos.x + size, bottom:pos.y+size}

            // 風速: ダミー
            var windDir = wind[0].data[(90-Math.round(fire.lat))*360 + Math.round(fire.lng)];
            var v = {
              x:Math.cos(windDir * Math.PI / 180)*50,
              y:Math.sin(windDir * Math.PI / 180)*50
            };

            setInterval(
              function() {
                putParticle(svgLayer,
                  d3.randomUniform(rect.left, rect.right),
                  d3.randomUniform(rect.top, rect.bottom),
                  v.x, v.y
                );
              },
              interval
            )
          });
        });
      });
    }
  }
}
