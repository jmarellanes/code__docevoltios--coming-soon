import { openForm } from './components/open-form';
import { validateForm } from './components/form-validation';
import { homeAnimation } from './partials/home-animation';

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const log = console.log.bind(console);

const loader = select('.loader');

function init() {
  // make a tween that upgrade the gradient
  const progressTween = gsap.to('#theGradient stop', {
    paused: true,
    attr: { offset: '0%' },
    ease: 'none',
  });

  // setup variables
  let loadedImageCount = 0,
    imageCount;
  const container = select('.wrapper');

  // setup Images loaded
  const imgLoad = imagesLoaded(container);
  imageCount = imgLoad.images.length;

  // set the initial progress to 0
  updateProgress(0);

  // triggered after each item is loaded
  imgLoad.on('progress', function () {
    // increase the number of loaded images
    loadedImageCount++;
    // update progress
    // log(`Loaded images: ${loadedImageCount}`);
    updateProgress(loadedImageCount);
  });

  // update the progress of our progressBar tween
  function updateProgress(value) {
    // log(`Progress: ${value / imageCount}`);
    // tween progress bar tween to the right value
    gsap.to(progressTween, {
      progress: value / imageCount,
      duration: 0.3,
      ease: 'power1.out',
    });
  }

  // do whatever you want when all images are loaded
  imgLoad.on('done', function (instance) {
    // log('done');
    // we will simply init our loader animation onComplete
    gsap.set('#theGradient stop', {
      autoAlpha: 0,
      onComplete: initPageTransitions,
    });
  });
}

init();

function initPageTransitions() {
  barba.init({
    transitions: [
      {
        once() {
          // do something once on the initial page load
          initLoader();
        },
        async leave({ current }) {
          // animate loading screen in
          // await pageTransitionIn(current);
          log('Page In');
        },
        enter({ next }) {
          // animate loading screen away
          // pageTransitionOut(next);
          log('Page Out');
        },
      },
    ],
  });
}

function initLoader() {
  const loaderLogotypeMask = select('.loader__logotype-mask'),
    loaderLogotype = select('.loader__logotype');

  // Master Timeline
  const tlLoader = gsap.timeline();
  tlLoader.add(tlLoaderIn).add(tlLoaderOut);

  // GSAP Timelines
  const tlLoaderIn = gsap.timeline({
    defaults: {
      ease: 'power2.out',
    },
    delay: 0.5,
    onComplete: () => initFunctions(),
  });

  const tlLoaderOut = gsap.timeline({
    defaults: { ease: 'power3.in' },
    delay: 1.2,
  });

  tlLoaderIn
    .set([loaderLogotype, loaderLogotypeMask], { autoAlpha: 1 })
    .from(loaderLogotype, { duration: 0.6, yPercent: 100 });

  tlLoaderOut
    // .addPause(0.0001) // For debugging
    .to(loaderLogotypeMask, { duration: 1.3, yPercent: -300 })
    .to(loader, { duration: 1.4, top: '-104%' }, 0.1)
    .add('hiddeLoader', null)
    .to(loader, { duration: 0.2, autoAlpha: 0 }, 'hiddeLoader')
    .add(homeAnimation, 'hiddeLoader')
    .call(() => {
      loader.hidden = true;
    });
}

function initFunctions() {
  select('body').classList.remove('is-loading');
  openForm();
  validateForm();
}

// no window.addEventListener('load') because we are using imagesLoaded for preloading
