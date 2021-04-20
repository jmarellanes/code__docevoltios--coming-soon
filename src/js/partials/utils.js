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

export { removeFocusAfterClick };
