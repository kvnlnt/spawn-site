EvidenceFinder.Cell = (function(EASING, UTIL) {
    var Cell = function Cell(settings) {
        this.app = settings.app;
        this.parent = settings.parent;
        this.x = settings.x;
        this.y = settings.y;
        this.count = 0;
        this.radius = settings.radius;
        this.points = settings.points;
        this.filter = settings.filter;
        this.animationDirectionClasses = [
            "cell--animate-in"
        ];
        this.animationDelayClasses = [
            "cell--animation-delay-100",
            "cell--animation-delay-200",
            "cell--animation-delay-300",
            "cell--animation-delay-400",
            "cell--animation-delay-500"
        ];
        this.el = this.createEl();
    };

    Cell.prototype = {
        animateIn: function() {
            this.el.classList.add(this.getRandomDirectionClass());
            this.el.classList.add(this.getRandomDurationClass());
            this.el.querySelector(".cell__label").classList.add(this.getRandomDurationClass());
            return this;
        },

        animateOut: function() {},

        createEl: function() {

            // main group
            var hexGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            hexGroup.setAttribute("transform", "translate(" + this.x + ", " + this.y + ")");
            hexGroup.setAttribute("cell-id", this.filter.id);
            hexGroup.setAttribute("class", "cell " + this.filter.filterType + " " + (this.filter.isSelected === true ? 'cell--selected' : ''));
            hexGroup.addEventListener("click", this.handleClick.bind(this));

            // hex
            var hexPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            hexPath.setAttribute("d", "M" + this.points);
            hexPath.setAttribute("class", "cell__path");
            hexGroup.appendChild(hexPath);

            // count
            var countText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            countText.setAttribute("x", 0);
            countText.setAttribute("y", -40);
            countText.setAttribute("class", "cell__count");
            var countTextNode = document.createTextNode(this.count);
            countText.appendChild(countTextNode);
            hexGroup.appendChild(countText);

            // label
            var labelText = UTIL.createWrappableSVGtext(this.filter.label, 0, 0, '-');
            hexGroup.appendChild(labelText);

            // checkmark
            var checkmarkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            checkmarkPath.setAttribute("d", "M -8,40 0,48 12,32");
            checkmarkPath.setAttribute("class", "cell__checkmark");
            hexGroup.appendChild(checkmarkPath);

            return hexGroup;
        },

        convertPointsStringToArray: function(points) {
            return points.split(" ").map(function(a) {
                var coords = a.split(",");
                return {
                    x: parseFloat(coords[0]),
                    y: parseFloat(coords[1])
                };
            });
        },

        convertPointsArrayToString: function(points) {
            return points
                .map(function(a) {
                    return a.x + "," + a.y;
                })
                .join(" ");
        },

        getRandomDirectionClass: function() {
            return this.animationDirectionClasses[
                UTIL.randomInteger(0, this.animationDirectionClasses.length)
            ];
        },

        getRandomDurationClass: function() {
            return this.animationDelayClasses[
                UTIL.randomInteger(0, this.animationDelayClasses.length)
            ];
        },

        handleClick: function(){
            this.filter.isSelected = !this.filter.isSelected;
            if(this.filter.isSelected){
                this.el.classList.add('cell--selected');
            } else {
                this.el.classList.remove('cell--selected');
            }
            this.parent.setGridToOrdered();
        },

        moveTo: function(gridCoords){
            this.el.setAttribute("transform", "translate("+gridCoords.x+", "+gridCoords.y+")");
        },

        setPoints: function(points) {
            this.el.setAttribute("points", points);
            this.points = points;
            return this;
        }
    };

    return Cell;
})(EvidenceFinder.Easing, EvidenceFinder.Util);