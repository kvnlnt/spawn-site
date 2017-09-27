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
        this.animateInClasses = ["cell--animate-in"];
        this.animateOutClasses = ["cell--animate-out"];
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
            this.el.classList.add(this.getRandomAnimateInClass());
            var animationDelay = this.getRandomDurationClass();
            this.el.classList.add(animationDelay);
            this.el.querySelector(".cell__label").classList.add(animationDelay);
            return this;
        },

        animateOut: function() {
            this.removeAllAnimateInClasses();
            this.el.classList.add(this.getRandomAnimateOutClass());
        },

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

        getRandomAnimateInClass: function() {
            return this.animateInClasses[
                UTIL.randomInteger(0, this.animateInClasses.length)
            ];
        },

        getRandomAnimateOutClass: function() {
            return this.animateOutClasses[
                UTIL.randomInteger(0, this.animateOutClasses.length)
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
            this.app.handleCellClick();
        },

        moveTo: function(gridCoords){
            // XXX: don't move if coords are the same, else you'll be redrawing all cells
            if(this.x === gridCoords.x && this.y === gridCoords.y) return;
            var that = this;
            this.animateOut();
            setTimeout(function(){
                that.removeAllAnimateOutClasses();
                that.el.setAttribute("transform", "translate("+gridCoords.x+", "+gridCoords.y+")");
                that.el.classList.add(that.getRandomAnimateInClass());
            }, 250);
            this.x = gridCoords.x;
            this.y = gridCoords.y;
        },

        removeAllAnimateInClasses: function(){
            var that = this;
            this.animateInClasses.forEach(function(c){
                that.el.classList.remove(c);
            });
            return this
        },

        removeAllAnimateOutClasses: function(){
            var that = this;
            this.animateOutClasses.forEach(function(c){
                that.el.classList.remove(c);
            });
            return this
        },

        removeAllDelayClasses: function(){
            var that = this;
            this.animationDelayClasses.forEach(function(c){
                that.el.classList.remove(c);
            });
            return this
        },

        setPoints: function(points) {
            this.el.setAttribute("points", points);
            this.points = points;
            return this;
        }
    };

    return Cell;
})(EvidenceFinder.Easing, EvidenceFinder.Util);