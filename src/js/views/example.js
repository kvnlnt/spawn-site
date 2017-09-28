(function(VIEWS) {
    function Example(settings) {
        this.app = settings.app;
        this.el = document.querySelector(".menu");
        this.registerEvents();
    }

    Example.prototype = {
        registerEvents: function() {}
    };

    VIEWS.Example = Example;
    return VIEWS;
}(
    App.Views || {}
));