/**
 * Store business logic
 */
(function(MODELS){

    function Route(settings) {
        var settings = settings || {};
        this.path = settings.path;
        this.controller = settings.controller;
        this.pathTemplate = this.replacePathParamsWithChar(this.path, '?');
        this.pathParamIndices = this.multiIndexOf(this.pathTemplate, '?');
        this.isDefault = settings.isDefault === true ? true : false;
    };

    Route.prototype = {
        isMatch: function(path) {
            return this.pathTemplate === this.replacePathIndicesWithChar(path, this.pathParamIndices, '?');
        },
        getPathParams: function(p) {
            var params = {};
            var pathElements = this.path.split("/");
            var pathToParseElements = p.split("/");
            this.pathParamIndices.forEach(function(a){
                return params[pathElements[a].replace(":", "")] = pathToParseElements[a];;
            });
            return params;
        },
        replacePathParamsWithChar: function(path, char) {
            return path
                .split("/")
                .map(function(a){
                    return (a.charAt(0) === ":" ? char : a);
                })
                .join("/");
        },
        replacePathIndicesWithChar: function(path, indices, char) {
            path = path.split("/");
            indices.forEach(function(a){
                return path.splice(a, 1, char);
            });
            return path.join("/");
        },
        multiIndexOf: function(pathTemplate, char) {
            return pathTemplate.split("/").reduce(function(a,e,i){
                if (e === char) a.push(i);
                return a;
            }, []);
        }
    };


    /**
     * Exports
     */
    MODELS.Route = Route;

    return MODELS;

}(App.Models || {}));



