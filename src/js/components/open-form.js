function openForm() {
  // TODO: Refactor > Use only one class on body for blur. Maybe for show form too.
  // TODO: Add Close Button?
  // TODO: Separate file for TODO

  // Shorthand Function
  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);
  const log = console.log.bind(console);

  // Script
  const openForm = select('.button__primary'),
    contactSection = select('article.contact'),
    formContainer = select('.contact-container'),
    formElement = select('.contact-container .form'),
    blurSections = selectAll('.header, .main, .works'),
    formGroups = selectAll('.contact__title, .form__group'),
    contactTitle = select('.contact__title'),
    contactForm = select('.form'),
    submitButton = select('.form__button'),
    closeButtonContainer = select('.close-form'),
    lines = selectAll('.lines'),
    topLine = select('.top-line'),
    bottomLine = select('.bottom-line'),
    failureContainer = select('.form__failure-container'),
    successContainer = select('.form__success-container');

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
      context: formElement,
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

  function animationOnClick() {
    tlButtonAnimation.reversed()
      ? tlButtonAnimation.play()
      : tlButtonAnimation.reverse();
  }

  const tlButtonAnimation = gsap.timeline({
    defaults: { duration: 0.25, ease: 'power2.inOut' },
    paused: true,
    reversed: true,
  });

  tlButtonAnimation
    .to(lines, { scaleX: 1, transformOrigin: '50% 50%' })
    .to(topLine, { rotation: 45 }, 'rotation')
    .to(bottomLine, { rotation: -45 }, 'rotation');

  function addCloseListener() {
    document.addEventListener('keydown', closeContact);
    closeButtonContainer.addEventListener('click', closeContact);
  }

  function openContact() {
    const tlOpen = gsap.timeline({ onComplete: addCloseListener });

    tlOpen
      .add('slideIn', 0)
      .set(formGroups, { opacity: 0, y: 180 })
      .set(closeButtonContainer, { opacity: 0, y: 50 })
      .set(lines, { scaleX: 0.125, x: 14 })
      .call(() => {
        contactSection.hidden = false;
      })
      .to(blurSections, { filter: 'blur(24px)' }, 'slideIn')
      .to(contactSection, { opacity: 1, zIndex: 4 }, 'slideIn')
      .to(formContainer, { x: 0 }, 'slideIn')
      .to(formGroups, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power1.out',
      })
      .to(
        closeButtonContainer,
        {
          duration: 0.3,
          opacity: 1,
          y: 0,
          ease: 'power1.out',
        },
        '-=.2'
      )
      .call(animationOnClick, null)
      .call(focusTrapEnable, null)
      .set(formGroups, { clearProps: 'all' }, 2);
  }

  function closeContact(e) {
    if (e.type === 'keydown') {
      let keyCode = e.keyCode === 27;
      if (!keyCode) return;
    }

    const tlClose = gsap.timeline({ onComplete: actionsOnComplete });

    function actionsOnComplete() {
      contactSection.hidden = true;
      gsap.set(formGroups, { clearProps: 'all' });
      // form-response-animation script set this values if is executed (when form is submitted)
      contactTitle.hidden == true ? (contactTitle.hidden = false) : '';
      contactForm.hidden == true ? (contactForm.hidden = false) : '';
      successContainer.hidden == false ? (successContainer.hidden = true) : '';
      failureContainer.hidden == false ? (failureContainer.hidden = true) : '';
    }

    tlClose
      .call(animationOnClick, null)
      .to(
        closeButtonContainer,
        {
          duration: 0.3,
          opacity: 0,
          y: 50,
          ease: 'power1.in',
        },
        '+=.5'
      )
      .to(
        formGroups,
        {
          duration: 0.4,
          opacity: 0,
          y: 150,
          ease: 'power1.in',
        },
        '-=.2'
      )
      .add('slideOut', 0.6)
      .to(formContainer, { clearProps: 'all' }, 'slideOut-=.1')
      .to(blurSections, { clearProps: 'all' }, 'slideOut')
      .to(contactSection, { clearProps: 'all' })
      .call(focusTrapDisable, null);

    document.removeEventListener('keydown', closeContact);
  }

  openForm.addEventListener('click', openContact);
}

export { openForm };
