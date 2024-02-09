'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////
// BUTTON SCROLLING
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // to get coordinates
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // Determine the absolute position of the element relative to the document
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////////
// PAGE NAVIGATION
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////////////////////
// TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Remove Active Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////////
// PASSING ARGUMENTS TO EVENT HANDLERS
// MENU FADE ANIMATION
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing argument into event handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////////////////////////
// IMPLEMENTING A STICKY NAVIGATION: SCROLL EVENT
// const initialCoords =section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function(){
//   console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

//////////////////////////////////////////////
// THE INTERSECTION OBSERVER API
// This API allows our code to basically observe changes to the way that a certain target element intersects another element or the way it intersects the viewport.
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////////
// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//lAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  //guard clause
  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////////
// BUILDING A SLIDER COMPONENT
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // Functions
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    // 0%, 100%, 200%, 300%
  };

  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove(`dots__dot--active`));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // curSlide = 1: -100%, 0%, 100%, 200%

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

////////////////////////////////////////////////////////////
// HOW THE DOM REALLY WORKS?
// DOM is basically the interface between all JS code & the browser, or more specifically HTML docs that are rendered in & by the browser.

// .querySelector() is available both for document & element types
// We usually listen for events by calling the .addEventListener method on an element or the document.

// Why this exactly work?
// Because there is a special node type called EventTarget which is parent of both node type & also the window node type.
// we can call addEventListener on every single type of node in the DOM API because all elements as well as document and window, and even text and comment will inherit this method and therefore we will be able to use addEventListener on all of them just as if it was their own method.

///////////////////////////////////////////////////////////////
// SELECTING, CREATING & DELETING ELEMENTS

// SELECTING ELEMENTS
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// return the first element that matches the querySelector here
const header = document.querySelector('.header');

// this will return a node-list that will contain all the elements
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

// It returns a html colllections of buttons which is different from node-list becoz  an HTML collection is actually so-call a life collection.
// That means that if the DOM changes then this collection is also immediately updated automatically.

console.log(allButtons);

console.log(document.getElementsByClassName('btn'));


// CREATING & INSERTING ELEMENTS
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Prepending adds the element as the first child of this element. But we can also edit the last child & so that is append
header.prepend(message);

// Now what we see here is that the element was actually only insert at once, now that's because this element here so message is now indeed a life element living in the DOM. And so therefore it cannot be at multiple places 
// header.append(message);

// First, we prepended the element & then we appended it. 
// And what this appends did here was to basically move the element from being the first child to being the last child. All right, so basically it moved the element and didn't really insert it because it was already inserted here by prepend So what this means is that we can use the prepend and append methods not only to insert elements but also to move them. And again, that is because a DOM element is unique. So it always only exist at one place at a time. 

// But what if we want to insert multiple copies of the same elements 

// header.append(message.cloneNode(true)); // all the child elements will be copied
// Instead of prepend & append we ca use this both
// header.before(message);
header.after(message);


// DELETING ELEMENTS

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  // message.remove();
  // This way of moving up & down in DOM tree like selecting the parent element is called DOM Traversing.
  // message.parentElement.removeChild(message);
})


/////////////////////////////////////////////////////////////////////
// STYLES, ATTRIBUTES & CLASSES
// Styles
message.style.backgroundColor = "#37383d";
message.style.width = '120%';

console.log(message.style.color); // its external styling & this will only displays inine styling
console.log(message.style.width);
console.log(message.style.backgroundColor);

// These are computed styles which means that its the real style as it appears on the page. And even if we do not declare it in our CSS.
// so for example, the height, we didn't define ourselves, but the browser of course needed to calculate the height to display it and so we can then get access to that value, and so you see it's this amount of pixels.
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful Minimalist logo';

// Non-standard
console.log(logo.designer); // undefined becoz its not the standard property of img tag
console.log(logo.getAttribute('designer'));
console.log(logo.setAttribute('company', 'Bankist'));

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attributes
console.log(logo.dataset.versionNumber);

// Classes
// These four methods here make it really nice to work with the classes by simply allowing us to add and remove classes based on their names, without interfering with the classes that are already there.
logo.classList.add('k', 'm');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use coz this will override all the existing clsses & also it allows us to only put 1 class on any element. 
logo.className = 'jonas';




/////////////////////////////////////////////////////////
// IMPLEMENTING SMOOTH SCROLLING 

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect(); // to get coordinates
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // Determine the absolute position of the element relative to the document
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
})


////////////////////////////////////////////////////////////////
// TYPES OF EVENTS & EVENT HANDLERS
// Event is basically a signal that is generated by a certain DOM node & a signal means that something has happened.
// Eg: a click somewhere or the mouse is moving or the user triggerring the full screen mode & really anything of importance that happens on our webpage, generates an event.
// We can then list & fold these events in our code using eventlisteners

// MouseEnter Events
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function(e){
//   alert('addEventListener: Great! U r reading the heading')
// });

const alertH1 = function(e) {
  alert('addEventListener: Great! U r reading th heading');
  h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// on-event property
// h1.onmouseenter = function(e) {
//     alert('onmouseenter: Great! U r reading th heading');
// }

// 2 ways why addEventListener is  better:
// First, it allows us to add multiple event listeners to the same event.
// Second, we can remove event handler in case we don't need it anymore.
// Third way of handling events which is by using an HTML attribute
// <h1 onclick="alert('HTML alert')"></h1> // like this in index.html



///////////////////////////////////////////////////////////////////////
// EVENT PROPAGATION: BUBBLING & CAPTURING PHASE

// rgb(255, 255, 255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

// Here true, means evethandler will not listen to bubbling events but it will listen to capturing events
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
}, true);
*/

//////////////////////////////////////////////////////////////////////////////////
// EVENT DELEGATION: IMPLEMENTING PAGE NAVIGATION

//////////////////////////////////////////////////////////////////////
// DOM TRAVERSING
// Walking through the DOM
// We can select an element based on another element
/*
const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'purple';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

// Change the style of siblings except the element itself
[...h1.parentElement.children].forEach(function(el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

/////////////////////////////////////////////////////////////////////////////////
//
//The HTML is parsed, then the script tag is found at the end of the document, then the script is fetched. And then finally, the script gets executed. And this is much better.

//we say lifecycle, we mean right from the moment that the page is first accessed, until the user leaves it.
//all scripts must be downloaded and executed before the DOM content loaded event can happen.

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

// By using this script gots abused becoz for a client it becomes a situation such that he has to do restart his PC wholly.
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   // e.returnValue = 'hi'; // Even here 'hi' string is passed in console it shows empty string because its a choice of JavaScript
//   e.returnValue = '';
// });
// when we have to script tag here at the end of the HTML, then we do not need to listen for the DOM content loaded event.
