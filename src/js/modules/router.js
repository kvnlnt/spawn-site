EvidenceFinder.Router = function(settings){
    var settings = settings || {};
    this.routes = [];
    this.app = settings.app;
    return this;
};

EvidenceFinder.Router.prototype = {
    addOneRoute: function(route) {
        this.routes.push(new EvidenceFinder.Route({
            path: route.path
        }));
        return this;
    },
    getRouteByPath: function(path){
        path = path || "#/";
        return this.routes.filter(function(a){
            return a.isMatch(path);
        })[0];
    },
    route: function(path, setStateOptions) {
        route = this.getRouteByPath(path);
        if(!route) return;
        this.app.setState({
            route: route,
            params: route.getPathParams(path)
        }, setStateOptions);
        return this;
    },
    addManyRoutes: function(routes) {
        routes.forEach(this.addOneRoute.bind(this));
        return this;
    }
};