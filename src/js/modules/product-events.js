const productEvents = () => {
  const productsSection = document.querySelector('.products');

  if (productsSection) {

    productsSection.addEventListener('click', (e) => {

      const getElements = () => {

        if (e.target.closest('.card')) {

          const parent = e.target.closest('.card');
          const img = parent.querySelector('.card__image img');
          const subtitle = parent.querySelector('.card__body-title');
          const desc = parent.querySelector('.card__body-text');
          const staticPrice = parent.querySelector('.card__body-price span');
          const showPrice = parent.querySelector('.card__body-hover-price span');
          const counter = parent.querySelector('.card__counter');
          const defaultElem = parent.querySelector('.card__body-bottom');
          const hoverElem = parent.querySelector('.card__body-hover');
  
          return {
            parent, img, subtitle, desc, staticPrice, showPrice, counter, defaultElem, hoverElem
          };
        }
      };

      const wClasses = method => {
        getElements().hoverElem.classList[method]('added');
        getElements().defaultElem.classList[method]('added');
        getElements().counter.classList[method]('added');
      };

      const cardData = () => {
        return {
          id: getElements().parent.id,
          img: getElements().img.src.slice(-6),
          counter: getElements().counter.textContent, 
          subtitle: getElements().subtitle.textContent,
          desc: getElements().desc.textContent,
          staticPrice: getElements().staticPrice.textContent,
          showPrice: getElements().showPrice.textContent
        };
      };

      if (e.target.classList.contains('card__body-btn')) {
        wClasses('add');

        localStorage.setItem('id ' + getElements().parent.id, JSON.stringify(cardData()));
      }

      if (e.target.classList.contains('card__body-plus')) {
        getElements().counter.textContent++;

        getElements().showPrice.textContent = 
          (+getElements().staticPrice.textContent) + (+getElements().showPrice.textContent);

        localStorage.setItem('id ' + getElements().parent.id, JSON.stringify(cardData()));
      }

      if (e.target.classList.contains('card__body-minus')) {
        getElements().counter.textContent--;

        getElements().showPrice.textContent = 
          (+getElements().showPrice.textContent) - (+getElements().staticPrice.textContent);

        localStorage.setItem('id ' + getElements().parent.id, JSON.stringify(cardData()));

        if (getElements().counter.textContent < 1) {
          wClasses('remove');

          getElements().counter.textContent = 1;
          getElements().showPrice.textContent = getElements().staticPrice.textContent;

          localStorage.removeItem('id ' + getElements().parent.id);
        }
      }
    });

    
  }
};

export default productEvents;