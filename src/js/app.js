import { openForm } from './components/open-form';
import { validateForm } from './components/form-validation';

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const log = console.log.bind(console);

const loader = select('.loader');

function initLoader() {
  const loaderBrandmark = select('.loader__brandmark'),
    loaderBrandmarkMask = select('.loader__brandmark-mask'),
    loaderLogotypeMask = select('.loader__logotype-mask'),
    loaderLogotype = select('.loader__logotype');

  // Master Timeline
  const tlLoader = gsap.timeline();
  tlLoader.add(tlLoaderIn).add(tlLoaderOut);

  // GSAP Timelines
  const tlLoaderIn = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: 'power2.out',
    },
    onComplete: () => {
      select('body').classList.remove('is-loading');
    },
  });

  const tlLoaderOut = gsap.timeline({
    defaults: { duration: 1, ease: 'power2.in' },
    delay: 1,
  });

  tlLoaderIn
    .set(loaderLogotypeMask, { autoAlpha: 1 })
    .from(loaderLogotype, { yPercent: 100 });

  tlLoaderOut
    .to(loaderLogotypeMask, { yPercent: -300 }, 0)
    .to(loader, { yPercent: -100 }, 0.2)
    .from('.wrapper', { y: 150 }, 0.2);
}

function init() {
  initLoader();
  openForm();
  validateForm();
}

window.addEventListener('load', function () {
  init();
});

// // Wait until DOM is ready
// document.addEventListener('DOMContentLoaded', function (event) {
//   // Wait until images, links, fonts, stylesheets, and js is loaded
//
//   window.onload = function () {
//     // Waits until next available screen repaint to run code
//     window.requestAnimationFrame(function () {});
//   };
// });
