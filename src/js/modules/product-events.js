const productEvents = () => {
  const cards = document.querySelectorAll('.card');
  const cartCounter = document.querySelector('.cart-header__counter');
  
  if (document.querySelector('.products')) {

    const addInfoFromLStorage = (item, counter, price, showHoverElems) => {
      for (const key in localStorage) {
        if (typeof(localStorage[key]) === 'string') {
          const data = JSON.parse(localStorage[key]);
          
          if (key.split(' ').pop() == item.id) {
            console.log(data.counter);
            counter.textContent = data.counter;
            price.textContent = data.showPrice;
            showHoverElems('add');
          }
        }
      }
    };

    cards.forEach(card => {
      const img = card.querySelector('.card__image img');
      const counter = card.querySelector('.card__counter');
      const subtitle = card.querySelector('.card__body-title');
      const desc = card.querySelector('.card__body-text');

      const addBtn = card.querySelector('.card__body-btn');
      const plusBtn = card.querySelector('.card__body-plus');
      const minusBtn = card.querySelector('.card__body-minus');

      const defaultElem = card.querySelector('.card__body-bottom');
      const hoverElem = card.querySelector('.card__body-hover');
      const staticPrice = card.querySelector('.card__body-price span');
      const showPrice = card.querySelector('.card__body-hover-price span');

      const wClasses = method => {
        hoverElem.classList[method]('added');
        defaultElem.classList[method]('added');
        counter.classList[method]('added');
      };

      const infoCard = () => {
        return {
          id: card.id,
          img: img.src.slice(-6),
          counter: counter.textContent, 
          subtitle: subtitle.textContent,
          desc: desc.textContent,
          staticPrice: staticPrice.textContent,
          showPrice: showPrice.textContent
        };
      };

      addInfoFromLStorage(card, counter, showPrice, wClasses);

      cartCounter.textContent = hoverElem.classList.contains('added') ? 
        +cartCounter.textContent + (+counter.textContent) :
        cartCounter.textContent;

      card.addEventListener('click', (e) => {
  
        switch (e.target) {
          case addBtn:
            wClasses('add');
            localStorage.setItem('id ' + card.id, JSON.stringify(infoCard()));
            cartCounter.textContent++;
              break;
  
          case plusBtn:
            counter.textContent++;
            cartCounter.textContent++;
            showPrice.textContent = +staticPrice.textContent + (+showPrice.textContent);
            localStorage.setItem('id ' + card.id, JSON.stringify(infoCard()));
              break;
  
          case minusBtn:
            counter.textContent--;
            cartCounter.textContent--;
            showPrice.textContent = +showPrice.textContent - (+staticPrice.textContent);
            localStorage.setItem('id ' + card.id, JSON.stringify(infoCard()));
  
            if (counter.textContent < 1) {
              wClasses('remove');
              counter.textContent = 1;
              showPrice.textContent = staticPrice.textContent;
              localStorage.removeItem('id ' + card.id);
            }
              break;
        }
      });
    });
  }
};

export default productEvents;