const contactContainer = document.querySelector('.contact-container'),
  contactContent = contactContainer.querySelectorAll(
    '.contact__title, .form__group'
  ),
  contactTitle = contactContainer.querySelector('.contact__title'),
  contactForm = contactContainer.querySelector('.form');

function successSend() {
  const successContainer = document.querySelector('.form__success-container'),
    successChilds = successContainer.querySelectorAll(
      '.form__success-container > *'
    );

  const tlSuccessIn = gsap.timeline();

  tlSuccessIn
    .set(successChilds, { autoAlpha: 0 })
    .to(contactContent, {
      duration: 0.4,
      opacity: 0,
      y: 150,
      ease: 'power1.in',
    })
    .call(() => {
      successContainer.hidden = false;
      contactForm.hidden = true;
      contactTitle.hidden = true;
    })
    .from([successChilds[0], successChilds[1]], {
      duration: 0.4,
      autoAlpha: 0,
      y: -60,
    })
    .from(successChilds[2], { duration: 0.2, autoAlpha: 0, y: -40 }, '-=.2');
}

function failureSend() {
  const failureContainer = document.querySelector('.form__failure-container'),
    failureChilds = failureContainer.querySelectorAll(
      '.form__failure-container > *'
    );

  const tlFailureIn = gsap.timeline();

  tlFailureIn
    .set(failureChilds, { autoAlpha: 0 })
    .to(contactContent, {
      duration: 0.4,
      opacity: 0,
      y: 150,
      ease: 'power1.in',
    })
    .call(() => {
      failureContainer.hidden = false;
      contactForm.hidden = true;
      contactTitle.hidden = true;
    })
    .from([failureChilds[0], failureChilds[1]], {
      duration: 0.4,
      autoAlpha: 0,
      y: -60,
    })
    .from(
      [failureChilds[2], failureChilds[3]],
      { duration: 0.2, autoAlpha: 0, y: -40 },
      '-=.2'
    );
}

export { successSend, failureSend };
