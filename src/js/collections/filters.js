EvidenceFinder.Collections.FILTERS = (function(FILTER, FILTERS){

  var filters = FILTERS.map(function(a){ return new FILTER(a)});

  /**
   * Get record by key/val
   *
   * @param      {<type>}  key     The key
   * @param      {<type>}  val     The value
   * @return     {<type>}  The by.
   */
  filters.getBy = function(key, val) {
    return filters.filter(function(a){
      return a[key] === val;
    });
  };

  return filters;

}(EvidenceFinder.Filter, EvidenceFinder.DATA.FILTERS));