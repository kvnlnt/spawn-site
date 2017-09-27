EvidenceFinder.Views.Menu = (function(VIEW_STATES, UTIL, FILTERS, FILTER_TYPES, FILTER) {
  function Menu(settings) {
    this.app = settings.app;
    this.isShowing = false;
    this.el = document.querySelector(".menu");
    this
    .setupFilters()
    .registerEvents();
  }

  Menu.prototype = {
    align: function(){
      switch(this.app.state.viewState){
        case VIEW_STATES.FULLSCREEN_RANDOM:
          this.alignTo('.main__header');
          break;
        case VIEW_STATES.SPLITSCREEN_RESULTS:
          this.alignTo('.main__header');
          break;
        case VIEW_STATES.SPLITSCREEN_DETAILS:
          this.alignTo('.details__wrapper');
          break;
      }
    },
    alignTo: function(selector){
      var relativeEl = document.querySelector(selector);
      var relativeEloffset = UTIL.offset(relativeEl);
      var relativeElWidth = relativeEl.offsetWidth;
      var menuWidth = this.el.offsetWidth;
      this.el.style.left = (relativeElWidth + relativeEloffset.left) - menuWidth + 'px';
      return this;
    },
    createFilterEl: function(filter){
      var a = document.createElement('a');
      a.classList.add('menu__filter');
      var i = document.createElement('i');
      i.classList.add('menu__filter__checkmark');
      var l = document.createTextNode(filter.label);
      a.appendChild(i);
      a.appendChild(l);
      return a;
    },
    hide: function() {
      this.el.classList.remove("menu--showing");
      this.app.setAppMinHeightTo('100%');
      this.isShowing = false;
      return this;
    },
    show: function() {
      this.align();
      this.app.setAppMinHeightTo(this.el.offsetHeight + 'px');
      this.el.classList.add("menu--showing");
      this.isShowing = true;
      return this;
    },
    registerEvents: function() {
      document
        .querySelector(".main__header__menu")
        .addEventListener("click", this.toggle.bind(this));
      document
        .querySelector('.details__header__menu')
        .addEventListener("click", this.toggle.bind(this));
      document
        .querySelector(".menu__header__close")
        .addEventListener("click", this.toggle.bind(this));
        return this;
    },
    renderFilters: function(filters, containerSelector){
      var that = this;
      var filterEls = filters.map(function(a){
        return that.createFilterEl(a);
      });
      var container = document.querySelector(containerSelector);
      filterEls.forEach(function(a){
        container.appendChild(a);
      });
      return this;
    },
    renderEvidenceFilters: function(){
      var filters = FILTERS.getBy('filterType', FILTER_TYPES.EVIDENCE);
      this.renderFilters(filters, '.menu__evidence-type');
      return this;
    },
    renderProductFilters: function(){
      var filters = FILTERS.getBy('filterType', FILTER_TYPES.PRODUCT);
      this.renderFilters(filters, '.menu__product');
      return this;
    },
    renderCategoryFilters: function(){
      var filters = FILTERS.getBy('filterType', FILTER_TYPES.CATEGORY);
      this.renderFilters(filters.splice(0, filters.length/2), '.menu__category:nth-child(1)');
      this.renderFilters(filters.splice(filters.length/2, filters.length), '.menu__category:nth-child(2)');
      return this;
    },
    setupFilters: function(){
      this
      .renderEvidenceFilters()
      .renderProductFilters()
      .renderCategoryFilters();
      return this;
    },
    toggle: function() {
      if (this.isShowing) {
        this.hide();
      } else {
        this.show();
      }
      return this;
    }
  };

  return Menu;
}(
  EvidenceFinder.VIEW_STATES,
  EvidenceFinder.util,
  EvidenceFinder.Collections.FILTERS,
  EvidenceFinder.FILTER_TYPES,
  EvidenceFinder.Filter
));
