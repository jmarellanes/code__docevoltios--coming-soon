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
    // .addPause(0.3) // For debugging
    .set([headerMask, mainTitle, worksMask], { autoAlpha: 1 })
    .add('revealImage', 0.1)
    .add('revealChars', 0.2)
    .add('revealHeaderAndContent', 0.3)
    .staggerFromTo(
      '.actions__lines1 .actions__chars',
      0.4,
      { y: 175 },
      { y: 0, ease: 'power1.out' },
      0.1,
      'revealChars'
    )
    .staggerFromTo(
      '.actions__lines2 .actions__chars',
      0.4,
      { y: 175 },
      { y: 0, ease: 'power1.out' },
      0.1,
      'revealChars+=.2'
    )
    .fromTo(
      headerElements,
      { autoAlpha: 0, yPercent: -30 },
      { autoAlpha: 1, yPercent: 0, duration: 1 },
      'revealHeaderAndContent'
    )
    .fromTo(
      mainContent,
      { y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.8 },
      'revealHeaderAndContent+=.2'
    )
    .fromTo(
      worksMask,
      { autoAlpha: 1, yPercent: -100, transformOrigin: 'top' },
      {
        yPercent: 0,
        duration: 1.6,
      },
      'revealImage'
    )
    .fromTo(
      worksImg,
      { autoAlpha: 1, scale: 1.2, transformOrigin: 'top' },
      { autoAlpha: 1, scale: 1, ease: 'expoScale(1.2, 1)', duration: 1.3 },
      'revealImage'
    )
    .add(calculateWorksHeight, '-=.4');
}

export { homeAnimation };
