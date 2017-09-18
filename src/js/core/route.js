EvidenceFinder.Core.Route = function(settings) {
    this.settings = settings;
    this.path = settings.path;
    this.page = settings.page;
    this.pathTemplate = this.replacePathParamsWithChar(this.path, '?');
    this.pathParamIndices = this.multiIndexOf(this.pathTemplate), '?';
};

EvidenceFinder.Core.Route.prototype = {
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
