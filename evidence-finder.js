const CATEGORIES = {
  EVIDENCE: 'category-evidence',
  PRODUCT: 'category-product',
  CATEGORY: 'category-category'
};

const TARGETS = [
  { order: 1, x: 602, y: 149 },
  { order: 2, x: 515, y: 252 },
  { order: 3, x: 649, y: 279 },
  { order: 4, x: 426, y: 356 },
  { order: 5, x: 560, y: 382 },
  { order: 6, x: 767, y: 344 },
  { order: 7, x: 897, y: 382 },
  { order: 8, x: 322, y: 444 },
  { order: 9, x: 1031, y: 415 },
  { order: 10, x: 449, y: 488 },
  { order: 11, x: 677, y: 447 },
  { order: 12, x: 806, y: 480 },
  { order: 13, x: 936, y: 513 },
  { order: 14, x: 576, y: 539 },
  { order: 15, x: 707, y: 579 },
  { order: 16, x: 837, y: 611 },
  { order: 17, x: 450, y: 623 },
  { order: 18, x: 579, y: 673 }
];

const CIRCLES = [
  {
    id: 'rwe',
    label: 'Real World Evidence',
    category: CATEGORIES.EVIDENCE,
    count: 96
  },
  {
    id: 'clinical-trials',
    label: 'Clinical Trials',
    category: CATEGORIES.EVIDENCE,
    count: 20
  },
  {
    id: 'epidemiology',
    label: 'Epidemiology',
    category: CATEGORIES.EVIDENCE,
    count: 2
  },
  {
    id: 'liraglutide',
    label: 'Liraglutide',
    category: CATEGORIES.PRODUCT,
    count: 5
  },
  {
    id: 'semaglutide',
    label: 'Semaglutide',
    category: CATEGORIES.PRODUCT,
    count: 5
  },
  {
    id: 'weight-change',
    label: 'Weight Change',
    category: CATEGORIES.CATEGORY,
    count: 12
  },
  {
    id: 'burden-of-disease',
    label: 'Burden of Disease',
    category: CATEGORIES.CATEGORY,
    count: 20
  },
  {
    id: 'hypoglycemia',
    label: 'Hypoglycemia',
    category: CATEGORIES.CATEGORY,
    count: 2
  },
  {
    id: 'sub-population',
    label: 'Sub-population',
    category: CATEGORIES.CATEGORY,
    count: 2
  },
  {
    id: 'health-economic-evaluation',
    label: 'Health Economic Evaluation',
    category: CATEGORIES.CATEGORY,
    count: 10
  },
  {
    id: 'meta-analysis',
    label: 'Meta Analysis',
    category: CATEGORIES.CATEGORY,
    count: 15
  },
  {
    id: 'cost',
    label: 'Cost',
    category: CATEGORIES.CATEGORY,
    count: 19
  },
  {
    id: 'cardio-vascular',
    label: 'Cardio Vascular',
    category: CATEGORIES.CATEGORY,
    count: 7
  },
  {
    id: 'adherence-persistence',
    label: 'Adherence/ Persistence',
    category: CATEGORIES.CATEGORY,
    count: 28
  },
  {
    id: 'short-term-studies',
    label: 'Short-term Studies',
    category: CATEGORIES.CATEGORY,
    count: 1
  },
  {
    id: 'comparitive-effectiveness',
    label: 'Comparitive Effectiveness',
    category: CATEGORIES.CATEGORY,
    count: 29
  },
  {
    id: 'long-term-studies',
    label: 'Long-term Studies',
    category: CATEGORIES.CATEGORY,
    count: 2
  },
  {
    id: 'AIC',
    label: 'A1C',
    category: CATEGORIES.CATEGORY,
    count: 5
  }
];

class Circle {
  constructor(config, parent) {
    this.category = config.category;
    this.id = config.id;
    this.label = config.label;
    this.count = config.count;
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
    c.classList.add(this.category);
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

    // label
    var l = document.createElement('span');
    l.innerText = this.label;
    l.classList.add('circle__label');
    c.appendChild(l);

    return c;
  }
  handleClick(e) {
    this.toggleSelected();
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
  toggleSelected() {
    this.selected = !this.selected;

    if (this.selected) {
      this.el.classList.add(this.category + '--selected');

      var bounce = new Bounce();
      bounce
        .scale({
          from: { x: 0.5, y: 0.5 },
          to: { x: 1, y: 1 },
          duration: 600,
          stiffness: 4
        })
        .applyTo(this.el);
      // this.el.classList.remove('animated');
      // this.el.classList.add('tada');
    } else {
      this.el.classList.remove(this.category + '--selected');
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
  }
  checkCollision(circle1, circle2) {
    let dx = Math.ceil(circle1.x - circle2.x);
    let dy = Math.ceil(circle1.y - circle2.y);
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
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
          stiffness: 1
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
