const FILTER_TYPES = {
  EVIDENCE: 'filter-evidence',
  PRODUCT: 'filter-product',
  CATEGORY: 'filter-category'
};

const TARGETS = [
  { x: 602, y: 149 },
  { x: 515, y: 252 },
  { x: 649, y: 279 },
  { x: 560, y: 382 },
  { x: 426, y: 356 },
  { x: 767, y: 344 },
  { x: 897, y: 382 },
  { x: 322, y: 444 },
  { x: 1031, y: 415 },
  { x: 449, y: 488 },
  { x: 677, y: 447 },
  { x: 806, y: 480 },
  { x: 936, y: 513 },
  { x: 576, y: 539 },
  { x: 707, y: 579 },
  { x: 837, y: 611 },
  { x: 450, y: 623 },
  { x: 579, y: 673 }
];

const CIRCLES = [
  {
    id: 'rwe',
    label: 'Real World Evidence',
    filterType: FILTER_TYPES.EVIDENCE
  },
  {
    id: 'clinical-trials',
    label: 'Clinical Trials',
    filterType: FILTER_TYPES.EVIDENCE
  },
  {
    id: 'liraglutide',
    label: 'Liraglutide',
    filterType: FILTER_TYPES.PRODUCT
  },
  {
    id: 'semaglutide',
    label: 'Semaglutide',
    filterType: FILTER_TYPES.PRODUCT
  },
  {
    id: 'weight-change',
    label: 'Weight Change',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'burden-of-disease',
    label: 'Burden of Disease',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'hypoglycemia',
    label: 'Hypoglycemia',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'epidemiology',
    label: 'Epidemiology',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'sub-population',
    label: 'Sub-population',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'health-economic-evaluation',
    label: 'Health Economic Evaluation',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'meta-analysis',
    label: 'Meta Analysis',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'cost',
    label: 'Cost',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'cardio-vascular',
    label: 'Cardio Vascular',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'adherence-persistence',
    label: 'Adherence/ Persistence',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'short-term-studies',
    label: 'Short-term Studies',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'comparitive-effectiveness',
    label: 'Comparitive Effectiveness',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'long-term-studies',
    label: 'Long-term Studies',
    filterType: FILTER_TYPES.CATEGORY
  },
  {
    id: 'AIC',
    label: 'A1C',
    filterType: FILTER_TYPES.CATEGORY
  }
];

class Circle {
  constructor(config, app) {
    this.filterType = config.filterType;
    this.id = config.id;
    this.label = config.label;
    this.count = this.getArticleCount();
    this.app = app;
    this.selected = false;
    this.size = 130;
    this.radius = 50;
    this.showing = true;
    this.x = 0;
    this.y = 0;
    this.el = this.createEl();

    // reg events
    this.el.addEventListener('click', this.handleClick.bind(this));
  }
  createEl() {
    // circle
    var c = document.createElement('div');
    c.classList.add('circle');
    c.classList.add('circle--showing');
    c.classList.add(this.filterType);
    c.id = this.id;
    c.style.width = this.size + 'px';
    c.style.height = this.size + 'px';
    c.style.lineHeight = this.size + 'px';
    c.style.left = this.x + 'px';
    c.style.top = this.y + 'px';
    c.style.borderRadius = this.size + 'px';

    // article count
    var ac = document.createElement('div');
    ac.classList.add('circle__article-count');
    ac.innerText = this.count;
    c.appendChild(ac);

    // checkmark
    var cm = document.createElement('div');
    cm.classList.add('circle__checkmark');
    c.appendChild(cm);

    // checkmark
    var x = document.createElement('div');
    x.classList.add('circle__uncheck');
    x.innerText = '×';
    c.appendChild(x);

    // label
    var l = document.createElement('span');
    l.innerText = this.label;
    l.classList.add('circle__label');
    c.appendChild(l);

    return c;
  }
  getArticleCount() {
    let that = this;
    return ARTICLES.filter(x => {
      // if (that.id === 'rwe') return true;
      return (
        x.evidence === that.id ||
        x.product === that.id ||
        x.categories.indexOf(that.id) != -1
      );
    }).length;
  }
  handleClick(e) {
    this.toggleSelected();
    this.app.filter();
  }
  hide() {
    this.el.classList.remove('circle--showing');
    var bounce = new Bounce();
    bounce
      .scale({
        from: { x: 1, y: 1 },
        to: { x: 0.5, y: 0.5 },
        duration: 600,
        stiffness: 4
      })
      .applyTo(this.el);
  }
  move(x, y) {
    this.moveX(x);
    this.moveY(y);
    return this;
  }
  moveX(x) {
    this.x = x;
    this.el.style.left = this.x + 'px';
    return this;
  }
  moveY(y) {
    this.y = y;
    this.el.style.top = this.y + 'px';
    return this;
  }
  renderToDom() {
    document.querySelector('#EvidenceFinder').appendChild(this.el);
    return this;
  }
  show() {
    this.el.classList.add('circle--showing');
    var bounce = new Bounce();
    bounce
      .scale({
        from: { x: 0.5, y: 0.5 },
        to: { x: 1, y: 1 },
        duration: 1000,
        stiffness: 4
      })
      .applyTo(this.el);
  }
  toggleSelected() {
    this.selected = !this.selected;
    if (this.selected) {
      this.el.classList.add(this.filterType + '--selected');
      this.show();
    } else {
      this.el.classList.remove(this.filterType + '--selected');
    }
    return this;
  }
}

class EvidenceFinder {
  constructor() {
    this.width = 1440;
    this.height = 960;
    this.circles = CIRCLES.map(a => new Circle(a, this));
    this.packCircles();
    this.filter();
  }
  checkCollision(circle1, circle2) {
    let dx = Math.ceil(circle1.x - circle2.x);
    let dy = Math.ceil(circle1.y - circle2.y);
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
  }
  filter() {
    let filtersApplied = this.circles.filter(x => x.selected).map(x => x.id);
    let hasEvidenceFilter =
      filtersApplied.indexOf('rwe') > -1 ||
      filtersApplied.indexOf('clinical-trials') > -1;
    let hasProductFilter =
      filtersApplied.indexOf('liraglutide') > -1 ||
      filtersApplied.indexOf('semaglutide') > -1;
    let noFilter = !hasEvidenceFilter && !hasProductFilter;
    let filteredArticles = ARTICLES.filter(x => {
      let useEvidenceFilter = hasEvidenceFilter
        ? filtersApplied.indexOf(x.evidence) > -1
        : true;
      let useProductFilter = hasProductFilter
        ? filtersApplied.indexOf(x.product) > -1
        : true;
      return useEvidenceFilter && useProductFilter;
    });

    // tallies

    let livesStudied = filteredArticles.reduce((sum, x, i, ary) => {
      return sum + x.lives;
    }, 0);

    var livesTally = parseInt(
      document.querySelector('.tally__lives__number').innerText
    );
    var livesInterval = setInterval(function() {
      document.querySelector('.tally__lives__number').innerText = livesTally;
      if (livesTally === livesStudied) clearInterval(livesInterval);
      livesTally = livesTally > livesStudied ? livesTally - 1 : livesTally + 1;
    }, 1);

    var articlesTally = parseInt(
      document.querySelector('.tally__articles__number').innerText
    );
    var articlesInterval = setInterval(function() {
      document.querySelector(
        '.tally__articles__number'
      ).innerText = articlesTally;
      if (articlesTally === filteredArticles.length)
        clearInterval(articlesInterval);
      articlesTally =
        articlesTally > filteredArticles.length
          ? articlesTally - 1
          : articlesTally + 1;
    }, 5);

    let circlesToShow = _.uniq(
      _.flatten(filteredArticles.map(x => x.categories))
    );

    let circlesToFilterIn = [];
    let circlesToFilterOut = [];
    this.circles.forEach(x => {
      if (
        ['rwe', 'clinical-trials', 'liraglutide', 'semaglutide'].indexOf(
          x.id
        ) === -1 &&
        filtersApplied.indexOf(x.id) === -1
      ) {
        if (circlesToShow.indexOf(x.id) === -1 && !noFilter) {
          circlesToFilterOut.push(x);
        } else {
          circlesToFilterIn.push(x);
        }
      }
    });

    circlesToFilterIn.forEach((x, i) => {
      setTimeout(() => {
        x.show();
      }, _.random(0, 500));
    });

    circlesToFilterOut.forEach((x, i) => {
      setTimeout(() => {
        x.hide();
      }, _.random(0, 500));
    });

    // let filterByAllEvidenceTypes =
    //   (filtersApplied.indexOf('rwe') > -1 &&
    //     filtersApplied.indexOf('clinical-trials') > -1) ||
    //   (filtersApplied.indexOf('rwe') === -1 &&
    //     filtersApplied.indexOf('clinical-trials') === -1);

    // let filterByAllProductTypes =
    //   (filtersApplied.indexOf('liraglutide') > -1 &&
    //     filtersApplied.indexOf('semaglutide') > -1) ||
    //   (filtersApplied.indexOf('liraglutide') === -1 &&
    //     filtersApplied.indexOf('semaglutide') === -1);

    // console.log(distinctCategories);
  }
  hasOverlappingCircles() {
    return this.circles.every(x => {});
  }
  packCircles() {
    let that = this;
    this.circles.forEach((x, i) => {
      setTimeout(() => {
        x.move(TARGETS[i].x, TARGETS[i].y).renderToDom();
      }, _.random(0, 500));
      var bounce = new Bounce();
      bounce
        .scale({
          from: { x: 0.25, y: 0.25 },
          to: { x: 1, y: 1 },
          duration: 1000,
          stiffness: 8
        })
        .applyTo(x.el);
    });

    // while (i < 10) {
    //   text += 'The number is ' + i;
    //   i++;
    // }

    // this.circles.forEach(x => {
    //   that.circles.forEach(y => {
    //     if (x.id != y.id && that.checkCollision(x, y))
    //       that.resolveCollidingCircles(x, y);
    //   });
    // });
  }
  resolveCollidingCircles(circle1, circle2) {
    let xDiff = circle1.x - circle2.x;
    let yDiff = circle1.y - circle2.y;
    circle2.move(xDiff, yDiff);
  }
}

EvidenceFinder.prototype = {};

var app = new EvidenceFinder();
