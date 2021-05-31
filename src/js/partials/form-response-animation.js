function successSend(response) {
  const contactContainer = document.querySelector('.contact-container'),
    contactContent = contactContainer.querySelectorAll(
      '.contact__title, .form__group'
    ),
    contactTitle = contactContainer.querySelector('.contact__title'),
    contactForm = contactContainer.querySelector('.form'),
    successContainer = document.querySelector('.form__success-container'),
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

export { successSend };
