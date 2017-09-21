EvidenceFinder.App = (function(ROUTER, ROUTES, VIEW_STATES, MENU) {
    function App(settings) {
        this.settings = settings || {};
        this.state = {};
        this.state.container = settings.container;
        this.state.viewState = VIEW_STATES.FULLSCREEN_RANDOM;
        this.menu = new MENU({ app: this }); // this must exist before the router
        this.router = new ROUTER({ app: this });
        this.router.addOneRoute(ROUTES.HOME);
        this.router.addOneRoute(ROUTES.RESULTS);
        this.router.addOneRoute(ROUTES.ARTICLE);
        this.router.route(window.location.hash);
        this.registerEvents();
    }

    App.prototype = {
        handleArticleClick: function(e) {
            window.location.hash = "#/article";
        },
        handleLogoClick: function(e) {
            window.location.hash = "#/";
        },
        handleViewArticlesButtonClick: function(e) {
            window.location.hash = "#/results";
        },
        onStateChange: function(redraw) {
            if (redraw) {
                switch (this.state.route.path) {
                    case ROUTES.HOME.path:
                        this.showViewFullscreenRandom();
                        break;
                    case ROUTES.RESULTS.path:
                        this.showViewSplitscreenResults();
                        break;
                    case ROUTES.ARTICLE.path:
                        this.showViewSplitscreenDetail();
                        break;
                    case ROUTES.RELATED.path:
                        this.showViewSplitscreenDetail();
                        break;
                    default:
                        this.showViewFullscreenRandom();
                }
            }
            return this;
        },
        registerEvents: function() {
            // fixed DOM els
            document
                .querySelector(".main__body__view__articles")
                .addEventListener(
                    "click",
                    this.handleViewArticlesButtonClick.bind(this)
                );
            document
                .querySelector(".main__header__logo")
                .addEventListener("click", this.handleLogoClick.bind(this));

            // TODO: move to article view
            document
                .querySelector(".results__article")
                .addEventListener("click", this.handleArticleClick.bind(this));
        },
        removeAllStateClasses: function() {
            Object.keys(VIEW_STATES).forEach(function(vs) {
                document
                    .querySelector(".evidence-finder")
                    .classList.remove(VIEW_STATES[vs]);
            });
            return this;
        },
        /**
         * Sets the application minimum height to.
         *
         * @param      {<type>}  height  The height
         * desc       XXX: This is really just a hack to deal with the fact that we have absolutely positioned elements that are taller than the parent app container. This creates a scenario where the background color is cut off. By exposing the min-height of the app container we can allow views to conditionally control it
         */
        setAppMinHeightTo: function(height) {
            document.querySelector(".evidence-finder").style.minHeight = height;
        },
        setState: function(kv, options) {
            var options = options || {};
            var redraw = options.redraw === false ? false : true;
            Object.assign(this.state, kv);
            this.onStateChange(redraw);
            return this;
        },
        showViewFullscreenRandom: function() {
            this.removeAllStateClasses();
            // this.menu.hide();
            this.state.viewState = VIEW_STATES.FULLSCREEN_RANDOM;
            document
                .querySelector(".evidence-finder")
                .classList.add(VIEW_STATES.FULLSCREEN_RANDOM);
            console.log("fullscreen random");
            return this;
        },
        showViewSplitscreenDetail: function() {
            this.removeAllStateClasses();
            this.menu.hide();
            this.state.viewState = VIEW_STATES.SPLITSCREEN_DETAILS;
            document
                .querySelector(".evidence-finder")
                .classList.add(VIEW_STATES.SPLITSCREEN_DETAILS);
            console.log("splitscreen details", this.state);
            return this;
        },
        showViewSplitscreenResults: function() {
            this.removeAllStateClasses();
            this.menu.hide();
            this.state.viewState = VIEW_STATES.SPLITSCREEN_RESULTS;
            document
                .querySelector(".evidence-finder")
                .classList.add(VIEW_STATES.SPLITSCREEN_RESULTS);
            console.log("splitscreen results");
            return this;
        }
    };

    return App;
})(
    EvidenceFinder.Router,
    EvidenceFinder.ROUTES,
    EvidenceFinder.VIEW_STATES,
    EvidenceFinder.Views.Menu
);

/**
 * Boot application
 */
document.addEventListener("DOMContentLoaded", function(event) {
    EvidenceFinder.app = new EvidenceFinder.App({
        container: "evidence-finder"
    });
});
