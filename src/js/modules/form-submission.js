const formSubmission = () => {

  if (document.querySelector('.ordering')) {
    const form = document.querySelector('.ordering__form');
    const numberOfPersonsBox = document.querySelector('.time-ordering__quantity-box');
    const checkboxConfirm = document.querySelector('.confirm-ordering__checkbox-input');
    const cartCounter = document.querySelector('.cart-header__counter');

    const quantityProductsInCart = () => {
      for (const key in localStorage) {
        if (typeof(localStorage[key]) === 'string') {
          const data = JSON.parse(localStorage[key]);
          cartCounter.textContent = +cartCounter.textContent + (+data.counter);
        }
      }
    };

    quantityProductsInCart();

    const sendingData = async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json'
        }
      });

      return await response.json();
    };

    checkboxConfirm.addEventListener('change', () => {
      const submit = document.querySelector('.confirm-ordering__btn');
      if (checkboxConfirm.checked) {
        submit.style.cssText = `
        opacity: 1;
        pointer-events: all;`;
      } else {
        submit.style.cssText = `
        opacity: .45;
        pointer-events: none;`;
      }
    });
    
    numberOfPersonsBox.addEventListener('click', e => {
      const counter = document.querySelector('.ordering-counter');
      const minus = numberOfPersonsBox.querySelector('.ordering-minus');

      if (e.target.classList.contains('ordering-plus')) {
        counter.value++;
      }

      if (e.target.classList.contains('ordering-minus')) {
        counter.value--;
      }

      if (+counter.value >= 2) {
        minus.classList.remove('ban');
      } else {
        minus.classList.add('ban');
      }
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const loading = document.querySelector('.ordering__loading');

      const formData = new FormData(form);
      const objectData = JSON.stringify(Object.fromEntries(formData));

      loading.classList.add('show-load');
      document.body.style.overflow = 'hidden';

      const modalStatus = (emoji, title) => {
        const modal = document.querySelector('.modal');
        const modalTitle = modal.querySelector('.modal__title');
        const modalIcon = modal.querySelector('.modal__icon');

        loading.classList.remove('show-load');
        modal.classList.add('show-modal');
        modalIcon.classList.remove('icon-cart');
        modalIcon.innerHTML = emoji;
        modalTitle.textContent = title;
      };

      sendingData('https://jsonplaceholder.typicode.com/posts', objectData)
        .then((data) => {
          for (const key in data) {
            if (data[key].length >= 1) {
              console.log(`${key[0].toUpperCase() + key.slice(1)}: ${data[key]}`);
            }
          }

          modalStatus('&#127881', 'ЗАКАЗ ВЫПОЛНЕН');
          localStorage.clear();
        })
        .catch(() => modalStatus('&#128532', 'ПРОИЗОШЛА ОШИБКА'));
    });
  }
};

export default formSubmission;