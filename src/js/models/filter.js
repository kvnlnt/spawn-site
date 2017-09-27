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
      this.isSelected = false;
  };

  // instance methods

  Filter.prototype = {
  };

  return Filter;

}());