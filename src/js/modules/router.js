/**
 * Router
 * @desc       Works as an Observer, storing and watching 
 *             for route changes and matching them against a route object. On 
 *             change it calls an event on the main app instance.
 * @class      Router (name)
 * @param      {Function}           ROUTE   Route class
 * @param      {<type>}             EVENTS  Events enum
 * @return
 */
(function(MODULES, EVENTS){
    
    function Router(settings){
        var settings = settings || {};
        this.routes = [];
        this.app = settings.app;
        this.path = null;
        this.params = null;
        this.route = this.getRouteByPath(window.location.hash);
        this.registerEvents();
        return this;
    };

    Router.prototype = {
        init: function(){
            var dr = this.getDefaultRoute();
            if(dr) this.go(dr.path);
        },
        addRoute: function(route) {
            this.routes.push(route);
            return this;
        },
        getDefaultRoute: function(){
            return this.routes.filter(function(r){  return r.isDefault })[0] || null;
        },
        getRouteByPath: function(path){
            path = path || "#/";
            return this.routes.filter(function(a){
                return a.isMatch(path);
            })[0];
        },
        go: function(path) {

            // short circuit empty routes
            // TODO: show error page
            route = this.getRouteByPath(path);
            if(!route) return;

            // update router state
            var oldPath = this.path;
            this.route = route;
            this.path = path;
            this.params = route.getPathParams(path);

            // trigger route change event
            this.app.onEvent(EVENTS.ROUTE_CHANGE, {
                oldPath: oldPath,
                newPath: this.path
            });

            return this;
        },
        handleHashChange: function(e){
            this.go(window.location.hash);
        },
        registerEvents: function(){
            window.addEventListener("hashchange", this.handleHashChange.bind(this));
            return this;
        }
    };


    /**
     * Export
     */
    MODULES.Router = Router;

    return MODULES;
    
}(App.Modules || {}, App.EVENTS));