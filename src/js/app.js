EvidenceFinder.App = function App(settings){
    this.settings = settings || {};
    this.state = {};
    this.state.container = settings.container;
    this.router = new EvidenceFinder.Router({app: this});
    this.router.addOneRoute(EvidenceFinder.ROUTES.HOME);
    this.router.addOneRoute(EvidenceFinder.ROUTES.RESULTS);
    this.router.addOneRoute(EvidenceFinder.ROUTES.ARTICLE);
    this.router.route(window.location.hash);
    this.registerEvents();
};

EvidenceFinder.App.prototype = {
    handleLogoClick(e){
        window.location.hash = "#/";
    },
    handleViewArticlesButtonClick(e){
        window.location.hash = "#/results";
    },
    handleArticleClick(e){
        window.location.hash = "#/article";
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
            case EvidenceFinder.ROUTES.RELATED.path:
                this.showViewSplitscreenDetail();
                break;
            default:
                this.showViewFullscreenRandom();
        }
        return this;
    },
    registerEvents: function(){
        document
        .querySelector('.main__body__view__articles')
        .addEventListener('click', this.handleViewArticlesButtonClick.bind(this));
        document
        .querySelector('.main__header__logo')
        .addEventListener('click', this.handleLogoClick.bind(this));
        document
        .querySelector('.results__article')
        .addEventListener('click', this.handleArticleClick.bind(this))
    },
    removeAllStateClasses: function(){
        Object.keys(EvidenceFinder.VIEW_STATES).forEach(function(vs){
            document.querySelector(".evidence-finder").classList.remove(EvidenceFinder.VIEW_STATES[vs]);
        });
        return this;
    },
    setState(kv, options) {
        var options = options || {};
        var onStateChangeFunc = options.onStateChange === void 0 ? this.onStateChange.bind(this) : options.onStateChange.bind(this);
        Object.assign(this.state, kv);
        onStateChangeFunc();
        return this;
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

/**
 * Boot application
 */
document.addEventListener("DOMContentLoaded", function(event) {
    EvidenceFinder.app = new EvidenceFinder.App({
        container: "evidence-finder"
    });
});