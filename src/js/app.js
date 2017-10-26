(function(APP, ROUTER, ROUTE, CONTROLLERS, EVENTS) {
    function App(settings) {
        this.settings = settings || {};
        this.container = settings.container;
        this.state = {};
        this.router = new ROUTER({ app: this });
        this.router
        .addRoute(new ROUTE({path: "#/", controller: CONTROLLERS.A, isDefault: true}))
        .addRoute(new ROUTE({path: "#/b", controller: CONTROLLERS.B}))
        .addRoute(new ROUTE({path: "#/b/:id", controller: CONTROLLERS.C}))
        .init()
    }
    App.prototype = {
        onEvent:function(eventType, payload){
            switch(eventType){
                case EVENTS.ROUTE_CHANGE:
                    this.setState({
                        controller: new this.router.route.controller({app:this})
                    });
                break;
            }
        },
        onStateChange: function() {
            return this;
        },
        setState: function(kv, options) {
            var options = options || {};
            Object.assign(this.state, kv);
            this.onStateChange();
            return this;
        }
    };

    APP.App = App;

    return APP;
}(
    App || {},
    App.Modules.Router,
    App.Models.Route,
    App.Controllers,
    App.EVENTS
));