EvidenceFinder.Core.Router = {
    addRoute: function(route) {
        this.routes.push(new ARK.Route({
            path: route.path,
            page: route.page
        }));
    },
    getRouteByPath: function(path){
        path = path || "#/";
        return this.routes.filter(function(a){
            return a.isMatch(path);
        })[0];
    },
    routes: [],
    route: function(path, setStateOptions) {
        route = this.getRouteByPath(path);
        ARK.app.setState({
            route: route,
            page: route.page,
            params: route.getPathParams(path)
        }, setStateOptions);
    },
    addMultipleRoutes: function(routes) {
        routes.forEach(this.addRoute.bind(this));
    }
};