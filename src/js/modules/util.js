EvidenceFinder.Util = {
    offset: function offset(element) {
        var body = document.body,
            win = document.defaultView,
            docElem = document.documentElement,
            box = document.createElement("div");
        box.style.paddingLeft = box.style.width = "1px";
        body.appendChild(box);
        var isBoxModel = box.offsetWidth == 2;
        body.removeChild(box);
        box = element.getBoundingClientRect();
        var clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop =
            win.pageYOffset || (isBoxModel && docElem.scrollTop) || body.scrollTop,
            scrollLeft =
            win.pageXOffset ||
            (isBoxModel && docElem.scrollLeft) ||
            body.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        };
    },
    randomInteger: function randomInteger(min, max) {
        var min = min === void 0 ? 0 : min;
        var max = max === void 0 ? 100 : max;
        return Math.floor(Math.random() * (max - min) + min);
    },
    createWrappableSVGtext: function(caption, x, y, returnChar) {

            var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            svgText.setAttribute("class", "cell__label");
            var MAXIMUM_CHARS_PER_LINE = 15;
            var LINE_HEIGHT = 16;
            var words = caption.split(" ");
            var line = "";
            var lines = [];

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                if (testLine.length > MAXIMUM_CHARS_PER_LINE) {
                    lines.push(line);
                    line = words[n] + " ";
                } else {
                    line = testLine;
                }
            }

            // adjust for multiline
            if(false) {
                y = y - (lines.length*LINE_HEIGHT)/2 + 5;
            } else {
                y = y - LINE_HEIGHT;
            }

            switch(lines.length){
                case 0:
                    y = 0;
                break;
                case 1:
                    y = -8;
                break;
                case 2:
                    y = -16;
                break;
            }

            // draw lines
            lines.forEach(function(line){
                var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                svgTSpan.setAttributeNS(null, 'x', x);
                svgTSpan.setAttributeNS(null, 'y', y);
                y += LINE_HEIGHT;

                var tSpanTextNode = document.createTextNode(line);
                svgTSpan.appendChild(tSpanTextNode);
                svgText.appendChild(svgTSpan);
            });

            var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            svgTSpan.setAttributeNS(null, 'x', x);
            svgTSpan.setAttributeNS(null, 'y', y);
            var tSpanTextNode = document.createTextNode(line);
            svgTSpan.appendChild(tSpanTextNode);

            svgText.appendChild(svgTSpan);

            return svgText;
        }
};