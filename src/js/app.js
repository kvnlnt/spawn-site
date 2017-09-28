App.App = (function(ROUTER, ROUTE, VIEW_STATES, EVENTS) {
    function App(settings) {
        this.settings = settings || {};
        this.container = settings.container;
        this.state = {};
        this.state.viewState = VIEW_STATES.FULLSCREEN_RANDOM;
        this.router = new ROUTER({ app: this });
        this.router
        .addRoute(new ROUTE({path: "#/", viewState: VIEW_STATES.A}))
        .addRoute(new ROUTE({path: "#/b", viewState: VIEW_STATES.B}))
        .addRoute(new ROUTE({path: "#/b/:id", viewState: VIEW_STATES.C}));
        this.registerEvents();
    }
    App.prototype = {
        onEvent:function(eventType, payload){
            switch(eventType){
                case EVENTS.ROUTE_CHANGE:
                    this.setState({
                        redraw: true,
                        viewState: this.router.route.viewState
                    });
                break;
            }
        },
        onStateChange: function(redraw) {
            var redraw = redraw === false ? false : true;
            if (redraw) {
                // which view to draw
                switch (this.state.viewState) {
                    case VIEW_STATES.A:
                        this.showViewStateA();
                        break;
                    case VIEW_STATES.B:
                        this.showViewStateB();
                        break;
                    case VIEW_STATES.C:
                        this.showViewStateC();
                        break;
                    default:
                        return;
                }
            }
            return this;
        },
        registerEvents: function() {
            // fixed DO
        },
        setState: function(kv, options) {
            var options = options || {};
            Object.assign(this.state, kv);
            this.onStateChange();
            return this;
        },
        showViewStateA: function(){
            console.log('State A');

        }, 
        showViewStateB: function(){
            console.log('State B');
        },
        showViewStateC: function(){
            console.log('State C', this.router.params);
        }
    };

    return App;
})(
    App.Modules.Router,
    App.Models.Route,
    App.VIEW_STATES,
    App.EVENTS
);

/**
 * Boot application
 */
document.addEventListener("DOMContentLoaded", function(event) {
    App.app = new App.App({
        container: "app"
    }).setState({
        redraw: true,
        viewState: App.VIEW_STATES.A
    })
});
