function closeFormButton() {
  // Shorthand Function
  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);
  const log = console.log.bind(console);

  // Script
  const closeButton = select('.close-form__icon'),
    lines = selectAll('.lines'),
    topLine = select('.top-line'),
    bottomLine = select('.bottom-line');

  // GSAP Timelines
  const tlButtonOpen = new gsap.timeline({
    defaults: { duration: 0.25, ease: 'power2.inOut' },
    paused: true,
    reversed: true,
  });

  function animationOnClick() {
    log('Clicked');
    tlButtonOpen.reversed() ? tlButtonOpen.play() : tlButtonOpen.reverse();
  }

  tlButtonOpen
    .to(lines, { scaleX: 1, transformOrigin: '50% 50%' })
    .to(topLine, { rotation: 45 }, 'rotation')
    .to(bottomLine, { rotation: -45 }, 'rotation');

  closeButton.addEventListener('click', animationOnClick);
}

export { closeFormButton };
