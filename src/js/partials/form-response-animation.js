function successSend(response) {
  const contactContainer = document.querySelector('.contact-container'),
    contactContent = contactContainer.querySelectorAll(
      '.contact__title, .form__group'
    ),
    contactTitle = contactContainer.querySelector('.contact__title'),
    contactForm = contactContainer.querySelector('.form');

  console.log(response);

  const tlFormOut = gsap.timeline();

  tlFormOut
    .to(contactContent, {
      duration: 0.4,
      opacity: 0,
      y: 150,
      ease: 'power1.in',
    })
    .call(() => {
      console.log('Called');
    });
}

export { successSend };
