function createHeatmapLayerInto(map) {
  var heatmapLayer = new HeatmapOverlay(cfg = {
    radius: 0.01,
    maxOpacity: 400,
    minOpacity: 300,
    scaleRadius: true,
    useLocalExtrema: true,
    gradient: { 0.1: '#900', 0.25: '#f96', 0.5: '#fd9', 0.75: '#ffd', 1: "white" }
  }).addTo(map);

  return {
    heatmapLayer: heatmapLayer,
    loadData: function(path) {
      $.getJSON(path, function(data) {
        heatmapLayer.setData({"max": 400, "data": data});
      });
    }
  };
};
