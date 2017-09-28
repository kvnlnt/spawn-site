/**
 * Store business logic
 */
(function(MODELS){

    var Example = function(settings) {
        var settings = settings || {};
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
    MODELS.Example = Example;

    return MODELS;

}(App.Models || {}));