(() => {
  const changeColorButtons = document.querySelectorAll(
    '.colors-container__button'
  );
  const sizesButtonContainer = document.querySelector('.body__sizes-container');
  const sneakersContainer = document.querySelector('.container__sneakers');

  const colors = ['blue', 'red', 'green', 'orange', 'black'];
  const textColors = colors.map((color) => `${color}-text`);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchParams = Object.fromEntries(urlSearchParams.entries());

  let currentColor =
    searchParams['color'] &&
    colors.some((color) => color === searchParams['color'])
      ? searchParams['color']
      : 'blue';

  const changeImage = (newColor) => {
    const sneakersImage = sneakersContainer.querySelector('.sneakers__image');

    sneakersImage.setAttribute('src', `./images/${newColor}.png`);
  };

  const handleBgTransition = () => {
    const sneakersBgTranstion = document.querySelector(
      '.sneakers_bg-trasition'
    );

    sneakersBgTranstion.classList.remove('animate', ...colors);
    sneakersBgTranstion.offsetWidth;
    sneakersBgTranstion.classList.add('animate', currentColor);
  };

  const changeShareColor = () => {
    const shareIcon = document.querySelector('.share__icon');

    shareIcon.classList.remove(...textColors);
    shareIcon.classList.add(`${currentColor}-text`);
  };

  const changeColors = (newColor) => {
    const backgroundTransitions =
      document.querySelectorAll('.color-transition');

    backgroundTransitions.forEach((bgTransition) => {
      bgTransition.classList.remove(...colors);
      bgTransition.classList.add(newColor);
      currentColor = newColor;
    });

    changeImage(newColor);
    handleBgTransition();
    changeShareColor();
  };

  changeColorButtons.forEach((changeColorButton) => {
    const colorClass = changeColorButton.dataset.colorclass;
    changeColorButton.addEventListener('click', () => {
      changeColors(colorClass);
    });
  });

  sizesButtonContainer
    .querySelectorAll('.sizes-container__button')
    .forEach((sizeButton) => {
      sizeButton.addEventListener('click', (e) => {
        const currentSelectedButton = sizesButtonContainer.querySelector(
          '.sizes-container__button-selected'
        );

        const selectedButton = e.target;

        currentSelectedButton.classList.remove(
          'sizes-container__button-selected',
          'color-transition',
          ...colors
        );

        selectedButton.classList.add(
          'sizes-container__button-selected',
          'color-transition',
          currentColor
        );
      });
    });

  changeColors(currentColor);
})();
