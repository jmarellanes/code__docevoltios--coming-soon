function openForm() {
  // TODO: Refactor > Use only one class on body for blur. Maybe for show form too.
  // TODO: Add Close Button?
  // TODO: Separate file for TODO

  // Shorthand Function
  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);
  const log = console.log.bind(console);

  const openForm = select('.button__primary'),
    contactSection = select('article.contact'),
    formContainer = select('.contact-container'),
    headerSection = select('.header'),
    mainSection = select('.main'),
    worksSection = select('.works'),
    formGroups = selectAll('.contact__title, .form__group'),
    formElements = selectAll('input, textarea, .form__button');

  const openContact = () => {
    const tlOpen = gsap.timeline();

    formElements.forEach((el) => {
      el.disabled = false;
    });

    tlOpen
      .set(formGroups, { autoAlpha: 0, y: 150 })
      .call(() => {
        headerSection.classList.add('header--blurred');
        mainSection.classList.add('main--blurred');
        worksSection.classList.add('works--blurred');
        contactSection.classList.add('contact--active');
        formContainer.classList.add('contact-container--active');
      })
      .to(formGroups, {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        ease: 'power2.inOut',
      });

    document.addEventListener('keydown', closeContact);
  };

  function closeContact(e) {
    let keyCode = e.keyCode === 27;
    if (!keyCode) return;

    const tlClose = gsap.timeline();

    formElements.forEach((el) => {
      el.disabled = true;
    });

    tlClose
      .to(formGroups, {
        duration: 0.4,
        autoAlpha: 0,
        y: 150,
        ease: 'power2.in',
      })
      .call(() => {
        formContainer.classList.remove('contact-container--active');
        headerSection.classList.remove('header--blurred');
        mainSection.classList.remove('main--blurred');
        worksSection.classList.remove('works--blurred');
      })
      .call(
        () => {
          contactSection.classList.remove('contact--active');
        },
        null,
        1
      )
      .set(formGroups, { clearProps: 'all' }, 2);

    document.removeEventListener('keydown', closeContact);
  }

  openForm.addEventListener('click', openContact);
}

export { openForm };
