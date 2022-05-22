const tabs = () => {

  if (document.querySelector('.ordering')) {
    const tab = (buttons, contents, activeClass) => {
      const btns = document.querySelectorAll(buttons);
      const tabContents = document.querySelectorAll(contents);
  
      const showLabel = () => {
        const label = document.querySelector('.delivery-ordering__label');
        const labelBlockBtns = document.querySelectorAll('.ordering__delivery .ordering__btn');
  
        if (labelBlockBtns[labelBlockBtns.length -1].classList.contains(activeClass)) {
          label.style.opacity = '0';
          label.style.height = '0';
        } else {
          label.style.opacity = '1';
          label.style.height = 'none';
        }
      };
  
      showLabel();
  
      btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
  
          if (tabContents.length != btns.length) {
            btns.forEach(btn => btn.classList.remove(activeClass));
            btn.classList.add(activeClass);
  
            if (btns[btns.length -1].classList.contains(activeClass)) {
              tabContents[tabContents.length -1].classList.add(activeClass);
            } else {
              tabContents[tabContents.length -1].classList.remove(activeClass);
            }
          } else {
            btns.forEach(btn => btn.classList.remove(activeClass));
            tabContents.forEach(content => content.classList.remove(activeClass));
            btn.classList.add(activeClass);
            tabContents[i].classList.add(activeClass);
          }
  
          showLabel();
        });
      });
    };
  
    
    tab('.ordering__delivery .ordering__btn', '.ordering__delivery .ordering__hover', 'active');
    tab('.ordering__pay .ordering__btn', '.ordering__pay .ordering__hover', 'active');
    tab('.ordering__time .ordering__btn', '.ordering__time .ordering__hover', 'active');
  }
};

export default tabs;