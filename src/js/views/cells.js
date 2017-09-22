EvidenceFinder.Views.Cells = (function(FILTERS, VIEW_STATES) {
  function Cells(settings) {
    this.app = settings.app;
    this.rows = 5;
    this.cols = 6;
  }

  Cells.prototype = {

    calcHexPoints: function(x, y, radius) {
      var points = [];
      for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
        var pointX, pointY;
        pointX = x + radius * Math.sin(theta);
        pointY = y + radius * Math.cos(theta);
        points.push(pointX + "," + pointY);
      }
      return points.join(" ");
    },

    createCell: function(params) {
      var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("cell-x", params.x);
      polygon.setAttribute("cell-y", params.y);
      polygon.setAttribute("cell-id", params.id);
      polygon.setAttribute("cell-is-active", params.isActive);
      polygon.setAttribute("cell-animation-start", this.calcHexPoints(params.x, params.y, 1));
      polygon.setAttribute("cell-animation-end", this.calcHexPoints(params.x, params.y, params.radius));
      polygon.setAttribute("points", this.calcHexPoints(params.x, params.y, params.radius));
      polygon.addEventListener("click", this.handleClick.bind(this));
      return polygon;
    },

    getGridConfig: function(viewState){
      switch(viewState){
        case VIEW_STATES.FULLSCREEN_RANDOM:
          return Cells.GRIDS.RANDOM;
        break;
        case VIEW_STATES.FULLSCREEN_ORDERED:
          return Cells.GRIDS.ORDERED;
        break;
        case VIEW_STATES.SPLITSCREEN_DETAILS:
          return Cells.GRIDS.ASIDE;
        break;
        case VIEW_STATES.SPLITSCREEN_RESULTS:
          return Cells.GRIDS.ASIDE;
        break;
      }
    },

    render: function() {
      var x, y, row, col, polygon;
      var svg = document.getElementById("cells");
      var radius = 72;
      var spacing = 3;
      var id = 0;
      var gridConfig = this.getGridConfig(this.app.state.viewState);
      for (row = 0; row < this.rows; row += 1) {
        for (col = 0; col < this.cols; col += 1) {
          var offset = Math.sqrt(3) * radius / 2 + spacing;
          x = 75 + offset * col * 2;
          y = 150 + offset * row * Math.sqrt(3);
          if (row % 2 !== 0) x += offset;
          polygon = this.createCell({
            id: id, 
            row: row, 
            col: col, 
            x:x, 
            y:y, 
            radius: radius,
            isActive: gridConfig.indexOf(id) > -1
          });
          svg.appendChild(polygon);
          id += 1;
        }
      }
      return this;
    },

    handleClick: function (e) {
      console.log(e);
    },

  };

  Cells.GRIDS = {};
  Cells.GRIDS.RANDOM = [2,3,7,9,15,16,18,19,20,23,25,27];
  Cells.GRIDS.ORDERED = [2,3,7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  Cells.GRIDS.ASIDE = [2,3,7,8,9,12,13,14];

  return Cells;
}(
  EvidenceFinder.FILTERS,
  EvidenceFinder.VIEW_STATES
));
