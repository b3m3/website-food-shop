const productEvents = () => {
  const productsSection = document.querySelector('.products');
  const overviewSection = document.querySelector('.overview');
  const productsMenuSection = document.querySelector('.products-menu');
  const cards = document.querySelectorAll('.card');
  const cartCounter = document.querySelector('.cart-header__counter');
  const cartBtn = document.querySelectorAll('.cart-btn');
  const modal = document.querySelector('.modal');
  const overviewBackBtn = document.querySelector('.header-overview__back'); 

  if (document.querySelector('.products')) {

    const getInfoFromLStorage = (item, counter, price, showHoverElems) => {
      for (const key in localStorage) {
        if (typeof(localStorage[key]) === 'string') {
          const data = JSON.parse(localStorage[key]);
          
          if (key.split(' ').pop() == item.id) {
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
      const weight = card.querySelector('.card__body-weight span');

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

      const cartPreventDefault = () => {
        if (+cartCounter.textContent < 1) {
          cartBtn.forEach(btn => btn.setAttribute('href', '#'));
        } else {
          cartBtn.forEach(btn => btn.setAttribute('href', 'cart.html'));
        }
      };

      const addInfoToOverviewSection = (Img, Title, Desc, Weight, Price) => {
        const image = overviewSection.querySelector('.body-overview__image img');
        const title = overviewSection.querySelector('.body-overview__info-title');
        const desc = overviewSection.querySelector('.body-overview__info-text');
        const weights = overviewSection.querySelectorAll('.overview .weight');
        const price = overviewSection.querySelector('.body-overview__info-price span');

        image.src = Img;
        title.textContent = Title;
        desc.textContent = Desc;
        weights.forEach(weight => weight.textContent = Weight);
        price.textContent = Price;
      };

      const quantityProductsInCart = () => {
        cartCounter.textContent = 
          hoverElem.classList.contains('added') ? 
          +cartCounter.textContent + (+counter.textContent) :
          cartCounter.textContent;
      };

      getInfoFromLStorage(card, counter, showPrice, wClasses);
      cartPreventDefault();
      quantityProductsInCart();
      
      card.addEventListener('click', (e) => {
        switch (e.target) {
          case addBtn:
            wClasses('add');
            localStorage.setItem('id ' + card.id, JSON.stringify(infoCard()));
            cartCounter.textContent++;
            cartPreventDefault();
              break;
  
          case plusBtn:
            counter.textContent++;
            cartCounter.textContent++;
            showPrice.textContent = +staticPrice.textContent + (+showPrice.textContent);
            localStorage.setItem('id ' + card.id, JSON.stringify(infoCard()));
            cartPreventDefault();
              break;
  
          case minusBtn:
            counter.textContent--;
            cartCounter.textContent--;
            showPrice.textContent = +showPrice.textContent - (+staticPrice.textContent);
            localStorage.setItem('id ' + card.id, JSON.stringify(infoCard()));
            cartPreventDefault();
  
            if (counter.textContent < 1) {
              wClasses('remove');
              counter.textContent = 1;
              showPrice.textContent = staticPrice.textContent;
              localStorage.removeItem('id ' + card.id);
            }
              break;

          case img:
            addInfoToOverviewSection(
              img.src, subtitle.textContent, desc.textContent, weight.textContent, staticPrice.textContent
            );
            overviewSection.classList.add('show');
            productsSection.style.display = 'none';
            productsMenuSection.style.pointerEvents = 'none';
            productsMenuSection.style.opacity = '.4';

            productsMenuSection.scrollIntoView();
              break;
        }
      });

      modal.addEventListener('click', (e) => {
        if (
            e.target.classList.contains('modal__btn') || 
            e.target.classList.contains('modal') ||
            e.target.classList.contains('modal__close')
          ) {
          modal.classList.remove('show-modal');
        }
      });

      cartBtn.forEach(btn => {
        btn.addEventListener('click', () => {
          if (+cartCounter.textContent < 1) {
            modal.classList.add('show-modal');
          }
        });
      });

      overviewBackBtn.addEventListener('click', () => {
        overviewSection.classList.remove('show');
        productsSection.style.display = 'block';
        productsMenuSection.style.pointerEvents = 'all';
        productsMenuSection.style.opacity = '1';
      });
    });
  }
};

export default productEvents;