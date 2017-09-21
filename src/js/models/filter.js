EvidenceFinder.Filter = (function(){

  /**
   * Filter
   *
   * @class      Filter (name)
   * @param      {<type>}  settings  The settings
   */
  function Filter(settings) {
      var settings = settings || {};
      this.id = settings.id;
      this.label = settings.label;
      this.filterType = settings.filterType;
  };

  // static methods

  Filter.getFiltersByType = function(FILTERS, FILTER_TYPE) {
    return FILTERS.filter(function(a){
      return a.filterType === FILTER_TYPE
    });
  };

  // instance methods

  Filter.prototype = {
  };

  return Filter;

}());