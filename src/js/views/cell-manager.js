EvidenceFinder.Views.Cells = (function(CELL, FILTERS, VIEW_STATES, UTIL) {

    function Cells(settings) {
        this.app = settings.app;
        this.grid = Cells.GRIDS.RANDOM;
        this.filters = settings.filters;
        this.cells = [];
        this.hasRendered = false;
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

        createGrid: function(rows, cols, activeCellList) {

        },

        reflowCells: function(formFactorChange) {
            var that = this;
            this.app.setAppBodyWrapperMinHeightTo(this.grid[that.grid.length-1].y + 100);
            this.cells.forEach(function(cell, i) {
                cell.moveTo(that.grid[i]);
            });
        },

        render: function() {
            var cell;
            var svg = document.getElementById("cells");
            var that = this;
            this.filters.forEach(function(filter, i) {
                cell = new CELL({
                    app: that.app,
                    parent: that,
                    filter: filter,
                    x: that.grid[i].x,
                    y: that.grid[i].y,
                    radius: Cells.gridRadius,
                    points: that.calcHexPoints(0, 0, Cells.gridRadius)
                });
                svg.appendChild(cell.el);
                that.cells.push(cell);
                cell.animateIn();
            });
            this.hasRendered = true;
            return this;
        },

        setGridToAside: function() {
            this.grid = Cells.GRIDS.ASIDE;
            this.reflowCells();
            return this;
        },

        setGridToOrdered: function() {
            this.grid = Cells.GRIDS.ORDERED;
            this.reflowCells();
            return this;
        },

        setGridToRandom: function() {
            this.grid = Cells.GRIDS.RANDOM;
            this.reflowCells();
            return this;
        },

        handleCellClick: function(e) {
            console.log(e);
        },

    };

    Cells.gridRadius = 65;

    Cells.createGrid = function(rows, cols, activeCellList) {
        var x, y, row, col, cell, inActiveList;
        var radius = Cells.gridRadius;
        var spacing = 3;
        var coords = [];
        var currCell = 0;
        for (row = 0; row < rows; row += 1) {
            for (col = 0; col < cols; col += 1) {
                var offset = Math.sqrt(3) * radius / 2 + spacing;
                x = 110 + offset * col * 2;
                y = 130 + offset * row * Math.sqrt(3);
                if (row % 2 !== 0) x += offset;
                inActiveList = activeCellList.indexOf(currCell) > -1;
                if (inActiveList) coords.push({ x: x, y: y });
                currCell += 1;
            }
        }
        return coords;
    }

    Cells.GRIDS = {};
    Cells.GRIDS.RANDOM = Cells.createGrid(6, 6, [2, 3, 9, 12, 14, 15, 16, 17, 18, 19, 21, 23, 26, 27, 30, 31, 33, 34]);
    Cells.GRIDS.ORDERED = Cells.createGrid(6, 6, [2, 3, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 27]);
    Cells.GRIDS.ASIDE = Cells.createGrid(8, 3, [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20, 21]);

    return Cells;
}(
    EvidenceFinder.Cell,
    EvidenceFinder.FILTERS,
    EvidenceFinder.VIEW_STATES,
    EvidenceFinder.Util
));