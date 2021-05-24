/* =====================================================================
  -> REMOVING FOCUS ON 'A' AND 'BUTTON' AFTER CLICK
===================================================================== */
function removeFocusAfterClick() {
  const aLinks = document.querySelectorAll('a');
  const aButtons = document.querySelectorAll('button');

  function removeFocus(e) {
    setTimeout(() => {
      e.target.blur();
    }, 1000);
  }

  // Using mousedown event to avoid removing focus when using the keyboard.
  aLinks.forEach((aLink) => {
    aLink.addEventListener('mousedown', removeFocus);
  });

  aButtons.forEach((aButton) => {
    aButton.addEventListener('mousedown', removeFocus);
  });
}

/* =====================================================================
  -> CALCULATE works__container span height FOR INFINITE ANIMATION
===================================================================== */
function calculateWorksHeight() {
  const portfolioImage = document.querySelector('.works__container img'),
    animationState = document.querySelector('.works__container span');

  let worksContainerWidth = document.querySelector('.works__container'),
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

export { removeFocusAfterClick, calculateWorksHeight };
