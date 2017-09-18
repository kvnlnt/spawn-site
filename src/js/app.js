EvidenceFinder.App = function App(settings){
    this.settings = settings || {};
    this.state = {};
    this.state.container = settings.container;
    this.router = new EvidenceFinder.Router({app: this});
    this.router.addManyRoutes(settings.routes)
    this.router.route(window.location.hash);
};

EvidenceFinder.App.prototype = {
    setState(kv, options) {
        var options = options || {};
        var onStateChangeFunc = options.onStateChange === void 0 ? this.onStateChange.bind(this) : options.onStateChange.bind(this);
        Object.assign(this.state, kv);
        if(onStateChangeFunc) onStateChangeFunc();
        return this;
    },
    onStateChange() {
        console.log('onStateChange', this);
        return;
    }
};