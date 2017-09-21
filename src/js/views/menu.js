EvidenceFinder.Views.Menu = (function(VIEW_STATES, UTIL) {
  function Menu(settings) {
    this.app = settings.app;
    this.isShowing = false;
    this.el = document.querySelector(".menu");
    this.registerEvents();
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
    },
    hide: function() {
      this.el.classList.remove("menu--showing");
      this.isShowing = false;
    },
    show: function() {
      this.align();
      this.el.classList.add("menu--showing");
      this.isShowing = true;
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
    },
    toggle: function() {
      if (this.isShowing) {
        this.hide();
      } else {
        this.show();
      }
    }
  };

  return Menu;
}(EvidenceFinder.VIEW_STATES, EvidenceFinder.util));
