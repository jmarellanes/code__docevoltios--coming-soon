function homeAnimation() {
  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);
  const log = console.log.bind(console);

  const headerEl = select('.header');
  const mainEl = select('.main');
  const worksEl = select('.works');
  const worksMask = select('.works__container');
  const worksImg = select('.works__container span');

  // GSAP Timelines
  const tlHome = gsap.timeline({
    defaults: {
      ease: 'power2.out',
    },
  });

  tlHome
    .add('revealImage', 0)
    .fromTo(
      worksMask,
      1,
      { autoAlpha: 1, yPercent: -100, scaleY: 0.6, transformOrigin: 'top' },
      {
        yPercent: 0,
        scaleY: 1,
      },
      'revealImage'
    )
    .fromTo(
      worksImg,
      0.9,
      { scale: 1.1, autoAlpha: 1, transformOrigin: 'center' },
      { scale: 1, ease: 'expoScale(1.1, 1)' },
      'revealImage'
    );
}

export { homeAnimation };
