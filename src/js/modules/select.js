const select = () => {

  if (document.querySelector('.ordering')) {
    const btn = document.querySelector('.delivery-ordering__hover-btn');
    const hoverElem = document.querySelector('.delivery-ordering__hover-select');
  
    btn.addEventListener('click', () => {
      const options = document.querySelectorAll('.delivery-ordering__hover-item');
  
      hoverElem.classList.toggle('selected');
  
      options.forEach(option => {
        option.addEventListener('click', () => {
          btn.textContent = option.textContent;
          hoverElem.classList.remove('selected');
        });
      });
    });
  }
};

export default select;