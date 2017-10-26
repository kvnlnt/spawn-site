/**
 * Store business logic
 */
(function(CONTROLLERS){

    var Example = function(settings) {
        var settings = settings || {};
        this.app = settings.app;
        console.log('a', this.app);
    };

    /**
     * Static properties
     */
    Example.something = 1;

    /**
     * Static Methods
     */
    Example.nothing = function(){};

    /**
     * Instance Methods
     */
    Example.prototype = {
    };

    /**
     * Exports
     */
    CONTROLLERS.A = Example;

    return CONTROLLERS;

}(App.Controllers || {}));