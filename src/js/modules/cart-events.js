const cartEvents = () => {
  const cartCounter = document.querySelector('.cart-header__counter');

  if (document.querySelector('.cart')) {
    
    for (const key in localStorage) {

      if (typeof(localStorage[key]) === 'string') {
        const data = JSON.parse(localStorage[key]);
  
        const createCartCard = () => {
          const wrapp = document.querySelector('.cart__items');
          const card = document.createElement('div');
          card.id = data.id;
          card.classList.add('item-cart');
  
          card.innerHTML = `
            <div class="item-cart__img ibga">
              <img src="img/products/${data.img}" alt="image">
            </div>
            <div class="item-cart__info">
              <h4 class="item-cart__info-title">${data.subtitle}</h4>
              <p class="item-cart__info-text">${data.desc}</p>
            </div>
            <div class="item-cart__control">
              <button class="item-cart__btn minus-btn">-</button>
              <span class="item-cart__control-counter">${data.counter}</span>
              <button class="item-cart__btn plus-btn">+</button>
            </div>
            <p class="item-cart__price" data-price="${data.staticPrice}"><span>${data.showPrice}</span> $</p>
            <button class="item-cart__btn close-btn">&#215;</button>
          `;
  
          wrapp.append(card);
        };
  
        createCartCard();
      }
    }

    const cards = document.querySelectorAll('.item-cart');

    cards.forEach(card => {
      const img = card.querySelector('.item-cart__img img');
      const subtitle = card.querySelector('.item-cart__info-title');
      const desc = card.querySelector('.item-cart__info-text');
      const plusBtn = card.querySelector('.plus-btn');
      const minusBtn = card.querySelector('.minus-btn');
      const closeBtn = card.querySelector('.close-btn');
      const counter = card.querySelector('.item-cart__control-counter');
      const price = card.querySelector('.item-cart__price span');

      const banClick = () => counter.textContent <= 1 ? 
        minusBtn.classList.add('ban') :
        minusBtn.classList.remove('ban');

      const infoCard = () => {
        return {
          id: card.id,
          img: img.src.slice(-6),
          counter: counter.textContent,
          subtitle: subtitle.textContent,
          desc: desc.textContent,
          staticPrice: price.parentNode.dataset.price,
          showPrice: price.textContent
        };
      };

      banClick();

      cartCounter.textContent = +cartCounter.textContent + (+counter.textContent);

      card.addEventListener('click', (e) => {

        switch (e.target) {
          case plusBtn:
            counter.textContent++;
            cartCounter.textContent++;
            price.textContent = (+price.textContent) + (+price.parentNode.dataset.price);
            localStorage.setItem(`id ${card.id}`, JSON.stringify(infoCard()));
            banClick();
              break;

          case minusBtn:
            counter.textContent--;
            cartCounter.textContent--;
            price.textContent = price.textContent - price.parentNode.dataset.price;
            localStorage.setItem(`id ${card.id}`, JSON.stringify(infoCard()));
            banClick();
              break;

          case closeBtn:
            card.remove();
            localStorage.removeItem(`id ${card.id}`);
            cartCounter.textContent = cartCounter.textContent - counter.textContent;
              break;
        }
      });
    });
  }
};

export default cartEvents;