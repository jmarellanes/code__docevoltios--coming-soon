function openForm() {
  // TODO: Refactor > Use only one class on body for blur. Maybe for show form too.
  // TODO: Close on outside click
  // TODO: Add Close Button?
  const openForm = document.querySelector('.button__primary'),
    contactSection = document.querySelector('article.contact'),
    formContainer = contactSection.querySelector('.contact-container'),
    headerSection = document.querySelector('.header'),
    mainSection = document.querySelector('.main'),
    worksSection = document.querySelector('.works');

  function blurToggleAnimation() {
    if (contactSection.classList.contains('contact--active')) {
      formContainer.classList.toggle('contact-container--active');
      headerSection.classList.toggle('header--blurred');
      mainSection.classList.toggle('main--blurred');
      worksSection.classList.toggle('works--blurred');
      setTimeout(() => {
        contactSection.classList.toggle('contact--active');
      }, 600);
    } else {
      headerSection.classList.toggle('header--blurred');
      mainSection.classList.toggle('main--blurred');
      worksSection.classList.toggle('works--blurred');
      contactSection.classList.toggle('contact--active');
      formContainer.classList.toggle('contact-container--active');
    }
  }

  function openContact() {
    blurToggleAnimation();
    document.addEventListener('keydown', closeContact);
  }

  function closeContact(e) {
    let keyCode = e.keyCode === 27;
    if (!keyCode) return;
    console.log('Called');

    blurToggleAnimation();
    document.removeEventListener('keydown', closeContact);
  }

  openForm.addEventListener('click', openContact);
}

export { openForm };
