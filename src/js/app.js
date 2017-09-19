EvidenceFinder.App = function App(settings){
    this.settings = settings || {};
    this.state = {};
    this.state.container = settings.container;
    this.router = new EvidenceFinder.Router({app: this});
    this.router.addOneRoute(EvidenceFinder.ROUTES.HOME);
    this.router.addOneRoute(EvidenceFinder.ROUTES.RESULTS);
    this.router.addOneRoute(EvidenceFinder.ROUTES.ARTICLE);
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
        switch(this.state.route.path){
            case EvidenceFinder.ROUTES.HOME.path:
                this.showViewFullscreenRandom();
                break;
            case EvidenceFinder.ROUTES.RESULTS.path:
                this.showViewSplitscreenResults();
                break;
            case EvidenceFinder.ROUTES.ARTICLE.path:
                this.showViewSplitscreenDetail();
                break;
            default:
                this.showViewFullscreenRandom();
        }
        return this;
    },
    removeAllStateClasses: function(){
        Object.keys(EvidenceFinder.VIEW_STATES).forEach(function(vs){
            document.querySelector(".evidence-finder").classList.remove(vs);
        });
    },
    showViewFullscreenRandom: function(){
        this.removeAllStateClasses();
        document.querySelector(".evidence-finder").classList.add(EvidenceFinder.VIEW_STATES.FULLSCREEN_RANDOM);
        console.log('fullscreen random');
        return this;
    },
    showViewSplitscreenDetail: function(){
        this.removeAllStateClasses();
        document.querySelector(".evidence-finder").classList.add(EvidenceFinder.VIEW_STATES.SPLITSCREEN_DETAILS);
        console.log('splitscreen details', this.state);
        return this;
    },
    showViewSplitscreenResults: function(){
        this.removeAllStateClasses();
        document.querySelector(".evidence-finder").classList.add(EvidenceFinder.VIEW_STATES.SPLITSCREEN_RESULTS);
        console.log('splitscreen results');
        return this;
    },
};