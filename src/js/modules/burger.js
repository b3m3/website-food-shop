const burger = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');

  const removeBodyStyle = () => {
    if (!burger.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  };

  burger.onclick = () => {
    menu.classList.toggle('show-menu');
    burger.classList.toggle('active');
    document.body.style.overflow = 'hidden';
    removeBodyStyle();
  };

  menu.addEventListener('click', e => {
    if (e.target.classList.contains('menu__link') ||
        e.target.classList.contains('menu')) {
      menu.classList.remove('show-menu');
      burger.classList.remove('active');
      removeBodyStyle();
    }
  });
};

export default burger;