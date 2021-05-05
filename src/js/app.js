import { openForm } from './components/open-form';
// import { closeFormButton } from './components/close-form-button';
import { validateForm } from './components/form-validation';
import { removeFocusAfterClick } from './partials/utils';

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', function (event) {
  // Wait until images, links, fonts, stylesheets, and js is loaded
  // removeFocusAfterClick();
  openForm();
  // closeFormButton();
  validateForm();

  window.onload = function () {
    // Waits until next available screen repaint to run code
    window.requestAnimationFrame(function () {});
  };
});
