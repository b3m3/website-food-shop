const cartEvents = () => {
  const cartCounter = document.querySelector('.cart-header__counter');
  const quantityLabel = document.querySelector('.header-cart__label span');
  const total = document.querySelector('.bottom-cart__total-prise span');
  const difference = document.querySelector('.bottom-cart__diff-cash span');
  
  const sumToFreeShipping = 50;

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

      cartCounter.textContent = +cartCounter.textContent + (+counter.textContent);
      quantityLabel.textContent = cartCounter.textContent;
      total.textContent = +total.textContent + (+price.textContent);
      difference.textContent = sumToFreeShipping - total.textContent;

      const banClick = () => {
        if (counter.textContent <= 1) {
          minusBtn.classList.add('ban');
        } else {
          minusBtn.classList.remove('ban');
        }
      };

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

      const freeStatus = () => {
        if (difference.textContent <= 0) {
          difference.parentNode.classList.add('free');
          difference.textContent = '';
        } else {
          difference.parentNode.classList.remove('free');
        }
      };

      const correctEnding = () => {
        const ending = document.querySelector('.ending');
        quantityLabel.textContent = cartCounter.textContent;

        if (+quantityLabel.textContent % 10 === 1) {
          ending.textContent = 'товар';
        } else if (+quantityLabel.textContent % 10 >= 2 && +quantityLabel.textContent % 10 <= 4) {
          ending.textContent = 'товара';
        } else if (+quantityLabel.textContent % 10 >= 5 && +quantityLabel.textContent % 10 <= 9) {
          ending.textContent = 'товаров';
        } 

        if (+quantityLabel.textContent >= 5 && +quantityLabel.textContent <= 20) {
          ending.textContent = 'товаров';
        }
      };

      banClick();
      freeStatus();
      correctEnding();

      card.addEventListener('click', (e) => {

        switch (e.target) {
          case plusBtn:
            counter.textContent++;
            cartCounter.textContent++;
            total.textContent = +total.textContent + (+price.parentNode.dataset.price);
            price.textContent = (+price.textContent) + (+price.parentNode.dataset.price);
            difference.textContent = sumToFreeShipping - total.textContent;
            localStorage.setItem(`id ${card.id}`, JSON.stringify(infoCard()));
            banClick();
            freeStatus();
            correctEnding();
              break;

          case minusBtn:
            counter.textContent--;
            cartCounter.textContent--;
            total.textContent = +total.textContent - (+price.parentNode.dataset.price);
            price.textContent = price.textContent - price.parentNode.dataset.price;
            difference.textContent = sumToFreeShipping - total.textContent;
            localStorage.setItem(`id ${card.id}`, JSON.stringify(infoCard()));
            banClick();
            freeStatus();
            correctEnding();
              break;

          case closeBtn:
            cartCounter.textContent = cartCounter.textContent - counter.textContent;
            total.textContent = total.textContent - price.textContent;
            difference.textContent = sumToFreeShipping - total.textContent;
            localStorage.removeItem(`id ${card.id}`);
            card.classList.add('remove');
            setTimeout(() => card.remove(), 400);
            freeStatus();
            correctEnding();

            if (+cartCounter.textContent < 1) {
              const modal = document.querySelector('.modal');
              modal.classList.add('show-modal');
            }
              break;
        }
      });
    });
  }
};

export default cartEvents;