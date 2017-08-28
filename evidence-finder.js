function EvidenceFinder() {
  this.filters = [...document.querySelectorAll('.filter')];
  this.filters.forEach(x =>
    x.addEventListener('click', this.handleFilterClick.bind(this))
  );
  this.applyButton = document.querySelector('.filter--apply');
  this.applyButton.addEventListener(
    'click',
    this.handleApplyButtonClick.bind(this)
  );
}

EvidenceFinder.prototype = {
  changeFilterSetToLayout: function(setNumber) {
    var filters = document.querySelector('#app');
    filters.classList.remove('state--1');
    filters.classList.add('state--2');
  },
  filterResults: function() {
    // list of filters
    let selectedFilters = [
      ...document.querySelectorAll('.filter.filter--selected')
    ].map(x => x.getAttribute('filter'));

    // list of results
    let results = [...document.querySelectorAll('.results li')];

    // hide all before filtering
    results.forEach(x => x.classList.remove('show'));

    // show only those that apply in filtering
    let resultsToShow = results
      .filter((x, i) => {
        let itemFilters = x.getAttribute('filters').split(',');
        return this.intersection(selectedFilters, itemFilters).length;
      })
      .filter((x, i) => {
        return i < 3;
      });

    resultsToShow.forEach(x => x.classList.add('show'));
  },
  handleApplyButtonClick: function(e) {
    this.changeFilterSetToLayout(2);
  },
  handleFilterClick: function(e) {
    this.toggleFilterSelectedState(e.target);
    this.filterResults();
  },
  intersection: function(a, b) {
    let ab = a.filter(x => b.indexOf(x) != -1);
    let ba = b.filter(x => a.indexOf(x) != -1);
    let intersections = ab.concat(ba);
    let intersection = intersections.filter((x, i, self) => {
      return self.indexOf(x) === i;
    });
    return intersection;
  },
  toggleFilterSelectedState: function(el) {
    var isSelected = el.classList.contains('filter--selected');
    if (isSelected) {
      el.classList.remove('filter--selected');
    } else {
      el.classList.add('filter--selected');
    }
  }
};

new EvidenceFinder();
