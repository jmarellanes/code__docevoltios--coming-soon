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
    submitButton = select('.form__button');

  let disableHandle, tabHandle, hiddenHandle, focusedElementBeforeDialogOpened;

  function focusTrapEnable() {
    // Make sure that no element outside of the dialog
    // is exposed via the Accessibility Tree, to prevent
    // screen readers from navigating to content it shouldn't
    // be seeing while the dialog is open.
    hiddenHandle = ally.maintain.hidden({
      filter: contactSection,
    });

    // Make sure that not element outside of the contact form
    // can be interacted with while the contact form is visible
    disableHandle = ally.maintain.disabled({
      filter: contactSection,
    });

    // Make sure that Tab key controlled focus is trapped within
    // the tabsequence of the contact form and does not reach the
    // browser's UI
    tabHandle = ally.maintain.tabFocus({
      context: contactSection,
    });

    // Remember the focused element before we opened the dialog
    // so we can return focus to it once we close the dialog.
    focusedElementBeforeDialogOpened = document.activeElement;

    // the dialog is visible on screen, so find the first
    // keyboard focusable element (giving any element with
    // autofocus attribute precendence). If the dialog does
    // not contain any keyboard focusabe elements, focus will
    // be given to the dialog itself.
    var element = ally.query.firstTabbable({
      context: contactSection,
      defaultToContext: true,
    });
    element.focus();
  }

  function focusTrapDisable() {
    // Undo hiding elements outside of the dialog
    hiddenHandle.disengage();
    // Undo disabling elements outside of the contact form
    disableHandle.disengage();
    // Undo trapping Tab key Focus
    tabHandle.disengage();
    // return focus to where it was before we opened the dialog
    focusedElementBeforeDialogOpened.focus();
  }

  const openContact = () => {
    const tlOpen = gsap.timeline();

    tlOpen
      .call(() => {
        contactSection.hidden = false;
      })
      .set(formGroups, { autoAlpha: 0, y: 250 })
      .call(() => {
        headerSection.classList.add('header--blurred');
        mainSection.classList.add('main--blurred');
        worksSection.classList.add('works--blurred');
        contactSection.classList.add('contact--active');
        formContainer.classList.add('contact-container--active');
      }, null)
      .to(formGroups, {
        duration: 1,
        autoAlpha: 1,
        y: 0,
        ease: 'power2.out',
      })
      .call(focusTrapEnable, null)
      .set(formGroups, { clearProps: 'all' }, 2);

    document.addEventListener('keydown', closeContact);
  };

  function closeContact(e) {
    let keyCode = e.keyCode === 27;
    if (!keyCode) return;

    const tlClose = gsap.timeline();

    function slideOutAndBlur() {
      formContainer.classList.remove('contact-container--active');
      headerSection.classList.remove('header--blurred');
      mainSection.classList.remove('main--blurred');
      worksSection.classList.remove('works--blurred');
      setTimeout(() => {
        contactSection.classList.remove('contact--active');
      }, 600);
    }

    tlClose
      .to(formGroups, {
        duration: 0.6,
        autoAlpha: 0,
        y: 250,
        ease: 'power2.in',
      })
      .call(slideOutAndBlur, null, '-=.2')
      .call(focusTrapDisable, null, '<.8')
      .set(contactSection, {
        onComplete: () => {
          contactSection.hidden = true;
        },
      })
      .set(formGroups, {
        onComplete: () => {
          clearProps: 'all';
        },
      });

    document.removeEventListener('keydown', closeContact);
  }

  openForm.addEventListener('click', openContact);
}

export { openForm };
