(function () {
  // This variable is not to run the run.after glide event if we click on color variant
  let switchImageEvent = null;
  
  // Glide
  const glide = new Glide('.glide').mount({
    type: 'carousel',
    startAt: 0,
    perView: 1,
  });

  glide.on('run.after', function () {
    if(switchImageEvent !== 'click') {
      const activeImage = document
        .querySelector('.glide__slide--active img')
        .getAttribute('data-image');
      const activeColor = document.querySelector(`[data-color='${activeImage}']`);
      activeButtonOnColorClick(activeColor);
    } else {
      switchImageEvent = null;
    }
  });

  const colorButtons = document.querySelectorAll('[data-color]');
  const sizeButtons = document.querySelectorAll('[data-button]');
  const images = document.querySelectorAll('[data-image]');

  colorButtons.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      switchImageEvent = 'click';
      changeImageOnColorClick(e.target);
      activeButtonOnColorClick(e.target);
    })
  );

  sizeButtons.forEach((btn) =>
    btn.addEventListener('click', (e) => activeButtonOnColorClick(e.target))
  );

  const activeButtonOnColorClick = (btn) => {
    // Get attribute names to know what type of button is being pressed
    const attr = btn.getAttributeNames();
    let classToUse = '';
    // remove all active classes and add to new active element
    if (attr.includes('data-color')) {
      colorButtons.forEach((btn) =>
        btn.classList.remove('btn--colored-active')
      );
      classToUse = 'btn--colored-active';
    } else if (attr.includes('data-button')) {
      sizeButtons.forEach((btn) => btn.classList.remove('btn--primary-active'));
      classToUse = 'btn--primary-active';
    }
    btn.classList.add(classToUse);
  };

  const changeImageOnColorClick = (newActive) => {
    const newActiveAttr = newActive.getAttribute('data-color');
    images.forEach((image, index) => {
      if (image.getAttribute('data-image') === newActiveAttr) {
        glide.go(`=${index}`);
      }
    });
  };
})();
