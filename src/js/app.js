EvidenceFinder.App = (function(ROUTER, ROUTE, ROUTES, VIEW_STATES, MENU, CELLS, EVENTS, FILTERS) {
    function App(settings) {
        this.settings = settings || {};
        this.container = settings.container;
        this.state = {};
        this.state.viewState = VIEW_STATES.FULLSCREEN_RANDOM;
        this.menu = new MENU({ app: this }); // this must exist before the router
        this.cells = new CELLS({app:this, filters: FILTERS});
        this.router = new ROUTER({ app: this });
        this.router
        .addRoute(new ROUTE({path: "#/", viewState: VIEW_STATES.FULLSCREEN_RANDOM}))
        .addRoute(new ROUTE({path: "#/filtered", viewState: VIEW_STATES.FULLSCREEN_ORDERED}))
        .addRoute(new ROUTE({path: "#/results", viewState: VIEW_STATES.SPLITSCREEN_RESULTS}))
        .addRoute(new ROUTE({path: "#/article/:id", viewState: VIEW_STATES.SPLITSCREEN_DETAILS}))
        .addRoute(new ROUTE({path: "#/article/:id/related", viewState: VIEW_STATES.SPLITSCREEN_RELATED}))
        .go(window.location.hash);
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
                    case VIEW_STATES.FULLSCREEN_RANDOM:
                        this.showViewFullscreenRandom();
                        break;
                    case VIEW_STATES.SPLITSCREEN_RESULTS:
                        this.showViewSplitscreenResults();
                        break;
                    case VIEW_STATES.SPLITSCREEN_DETAILS:
                        this.showViewSplitscreenDetail();
                        break;
                    case VIEW_STATES.SPLITSCREEN_DETAILS:
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
            Object.assign(this.state, kv);
            this.onStateChange();
            return this;
        },
        showViewFullscreenRandom: function() {
            this.removeAllStateClasses();
            this.menu.hide();
            document
                .querySelector(".evidence-finder")
                .classList.add(VIEW_STATES.FULLSCREEN_RANDOM);
            this.cells.render();
            console.log("fullscreen random");
            return this;
        },
        showViewSplitscreenDetail: function() {
            this.removeAllStateClasses();
            this.menu.hide();
            document
                .querySelector(".evidence-finder")
                .classList.add(VIEW_STATES.SPLITSCREEN_DETAILS);
            console.log("splitscreen details");
            return this;
        },
        showViewSplitscreenResults: function() {
            this.removeAllStateClasses();
            this.menu.hide();
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
    EvidenceFinder.Route,
    EvidenceFinder.ROUTES,
    EvidenceFinder.VIEW_STATES,
    EvidenceFinder.Views.Menu,
    EvidenceFinder.Views.Cells,
    EvidenceFinder.EVENTS,
    EvidenceFinder.Collections.FILTERS
);

/**
 * Boot application
 */
document.addEventListener("DOMContentLoaded", function(event) {
    EvidenceFinder.app = new EvidenceFinder.App({
        container: "evidence-finder"
    });
});
