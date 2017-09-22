EvidenceFinder.Router = (function(ROUTE){
    
    function Router(settings){
        var settings = settings || {};
        this.routes = [];
        this.app = settings.app;
        this.registerEvents();
        return this;
    };

    Router.prototype = {
        addOneRoute: function(route) {
            this.routes.push(new ROUTE({
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
        handleHashChange: function(e){
            this.route(window.location.hash);
        },
        registerEvents: function(){
            window.addEventListener("hashchange", this.handleHashChange.bind(this))
        },
        route: function(path) {
            route = this.getRouteByPath(path);
            if(!route) return;
            this.app.setState({
                route: route,
                routeParams: route.getPathParams(path),
                redraw: true
            });
            return this;
        },
        addManyRoutes: function(routes) {
            routes.forEach(this.addOneRoute.bind(this));
            return this;
        }
    };

    return Router;
    
}(EvidenceFinder.Route));