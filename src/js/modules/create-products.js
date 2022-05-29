import slider from '../lib/slider.js';
import productEvents from '../modules/product-events.js';
import {pruductsMenuTab} from '../modules/tabs.js';

const createPoducts = () => {

  if (document.querySelector('.products')) {
    
    const getData = async () => {
      const res  = await fetch('./files/products.json');
      return await res.json();
    };
  
    const block = (wrapp, title) => {
      const item = document.createElement('div');
      item.classList.add('products__item');
      item.innerHTML = `
        <div class="products__header header-products container">
          <h2 class="header-products__title title">${title}</h2>
        </div>
        <div class="products__cards swiper">
          <div class="products__wrapp swiper-wrapper">
          </div>
        </div>
      `;
      wrapp.append(item);
    };
  
    const productCard = (wrapp, {id, img, subtitle, weight, desc, price}) => {
      const card = document.createElement('div');
      card.classList.add('card', 'swiper-slide');
      card.id = id;
      card.innerHTML = `
        <span class="card__counter">1</span>
        <div class="card__image ibga">
          <img src="img/products/${img}" alt="image">
        </div>
        <div class="card__body">
          <div class="card__body-top">
            <h5 class="card__body-title">${subtitle}</h5>
            <p class="card__body-weight">Вес: <span>${weight}</span>г</p>
          </div>
          <p class="card__body-text">${desc}</p>
          <div class="card__body-bottom">
            <p class="card__body-price"><span>${price}</span> $</p>
            <button class="card__body-btn btn">В корзину <span class="icon-buy"></span></button>
          </div>
          <div class="card__body-hover">
            <button class="card__body-minus btn">-</button>
            <p class="card__body-price card__body-hover-price"><span>${price}</span> $</p>
            <button class="card__body-plus btn">+</button>
          </div>
        </div>
      `;
      wrapp.append(card);
    };
  
    getData()
      .then((data) => {
        const productsData = [];
  
        for (const blocks in data) {
          const wrappBlocks = document.querySelector('.products__main');
          block(wrappBlocks, data[blocks][0].title);
          productsData.push(data[blocks][1]);
        }
  
        const wrappsProsucts = document.querySelectorAll('.products__wrapp');
        const productItems = document.querySelectorAll('.products__item');

        wrappsProsucts.forEach((wrapp, index) => {
          productsData[index].forEach(item => {
            productCard(wrapp, {...item});
          });
        });
        
        productEvents();
        pruductsMenuTab(productItems);
      })
      .catch((err) => console.log(err))
      .finally(() => setTimeout(slider, 300));
  }
};

export default createPoducts;