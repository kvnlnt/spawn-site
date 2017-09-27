EvidenceFinder.Collections.FILTERS = (function(FILTER, FILTERS){

  /**
   * The collection
   */
  var collection = FILTERS.map(function(a){ return new FILTER(a)});

  /**
   * Get record by key/val
   *
   * @param      {<type>}  key     The key
   * @param      {<type>}  val     The value
   * @return     {<type>}  The by.
   */
  function getBy(key, val) {
    return collection.filter(function(a){
      return a[key] === val;
    });
  };

  /**
   * Gets the active filters.
   *
   * @return     {<type>}  The active filters.
   */
  function getActiveFilters(){
    return collection.filter(function(filter){
      // return filter.isSelected === true;
      return true;
    });
  }

  return {
    collection: collection,
    getBy: getBy,
    getActiveFilters: getActiveFilters
  };

}(EvidenceFinder.Filter, EvidenceFinder.DATA.FILTERS));