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
          this.alignToMain();
          break;
        case VIEW_STATES.SPLITSCREEN_RESULTS:
          this.alignToMain();
          break;
        case VIEW_STATES.SPLITSCREEN_DETAILS:
          this.alignToDetails();
          break;
      }
    },
    alignToMain: function(){
      var mainHeaderEl = document.querySelector('.main__header__wrapper');
      var mainHeaderEloffset = UTIL.offset(mainHeaderEl);
      var mainHeaderElWidth = mainHeaderEl.offsetWidth;
      var menuWidth = this.el.offsetWidth;
      this.el.style.right = mainHeaderElWidth + 'px';
    },
    alignToDetails: function(){

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
