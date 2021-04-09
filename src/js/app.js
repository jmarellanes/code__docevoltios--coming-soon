import { validateForm } from './components/contact-form';

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', function (event) {
  // Wait until images, links, fonts, stylesheets, and js is loaded
  validateForm();
  window.onload = function () {
    // Waits until next available screen repaint to run code
    window.requestAnimationFrame(function () {});
  };
});
