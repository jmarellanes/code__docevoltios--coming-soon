function homeAnimation() {
  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);
  const log = console.log.bind(console);

  const headerMask = select('.header__container');
  const headerElements = selectAll('.header__container > div');
  const mainTitle = select('.actions__title');
  const mainContent = select('.actions__container');
  const worksMask = select('.works__container');
  const worksImg = select('.works__container span');

  // CALCULATE works__container span height FOR INFINITE ANIMATION
  function calculateWorksHeight() {
    const portfolioImage = select('.works__container img'),
      animationState = select('.works__container span');

    let worksContainerWidth = select('.works__container'),
      root = document.documentElement,
      updateWidth =
        (worksContainerWidth.offsetWidth / portfolioImage.width) *
        portfolioImage.height;

    root.style.setProperty(
      '--works-image-height',
      '-' + Math.round(updateWidth) + 'px'
    );

    animationState.style.animationPlayState = 'running';
  }

  // function replaceTextForAnimation(element) {
  //   const elementText = element.innerHTML;
  //   const arrayText = Array.from(elementText);
  //
  //   // let addSpanToEl = [];
  //   // for (let i = 0; i < element.length; i++) {
  //   //   addSpanToEl.push('<span>' + element.charAt(i) + '</span>');
  //   // }
  //
  //   const addSpanToEl = arrayText.map((letter) => {
  //     return `<span>${letter}</span>`;
  //   });
  //
  //   return (element.innerHTML = addSpanToEl.join(''));
  // }

  // GSAP Timelines
  const tlHome = gsap.timeline({
      defaults: {
        ease: 'power2.out',
      },
    }),
    mainTitleAnimation = new SplitText('.actions__title', {
      type: 'words, chars, lines',
      charsClass: 'actions__chars',
      wordsClass: 'actions__mask',
      linesClass: 'actions__lines++',
    });

  tlHome
    // .addPause(0.0001) // For Debugging Purpose
    .set([headerMask, mainTitle], { autoAlpha: 1 })
    .add('revealChars', 0)
    .staggerFromTo(
      '.actions__lines1 .actions__chars',
      0.2,
      { y: 175 },
      { y: 0, ease: 'power1.out' },
      0.1,
      'revealChars'
    )
    .staggerFromTo(
      '.actions__lines2 .actions__chars',
      0.2,
      { y: 175 },
      { y: 0, ease: 'power1.out' },
      0.1,
      'revealChars+=.2'
    )
    .add('revealHeaderAndContent', 0.2)
    .fromTo(
      headerElements,
      { autoAlpha: 0, yPercent: -30 },
      { autoAlpha: 1, yPercent: 0, duration: 0.8 },
      'revealHeaderAndContent'
    )
    .fromTo(
      mainContent,
      { y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.8 },
      'revealHeaderAndContent+=.2'
    )
    .add('revealImage', 0.4)
    .fromTo(
      worksMask,
      { autoAlpha: 1, yPercent: -100, scaleY: 0.6, transformOrigin: 'top' },
      {
        yPercent: 0,
        scaleY: 1,
        duration: 1,
      },
      'revealImage'
    )
    .fromTo(
      worksImg,
      { scale: 1.3, autoAlpha: 1, transformOrigin: 'center' },
      { scale: 1, ease: 'expoScale(1.3, 1)', duration: 0.9 },
      'revealImage'
    )
    .add(calculateWorksHeight, '-=.1');
}

export { homeAnimation };
