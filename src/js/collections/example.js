/**
 * Stores collections of models, can also be used to run IIF that serialize data from the data folder into model instances onload, etc.
 */
(function(COLLECTIONS){

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
    COLLECTIONS.Example = Example;

    return COLLECTIONS;

}(App.Collections || {}));