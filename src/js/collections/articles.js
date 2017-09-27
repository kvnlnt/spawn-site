EvidenceFinder.Collections.ARTICLES = (function(ARTICLE, ARTICLES){
  var articles = ARTICLES.map(function(a){ return new ARTICLE(a)});

  /**
   * Gets record by the key and value
   *
   * @param      {<type>}  key     The key
   * @param      {<type>}  val     The value
   * @return     {<type>}  The by.
   */
  articles.getBy = function(key, val) {
    return articles.filter(function(a){
      return a[key] === val;
    });
  };

  return articles;
}(EvidenceFinder.Article, EvidenceFinder.DATA.ARTICLES));