const menuButton = document.querySelector('.menu-button');
const navWrap = document.querySelector('#site-nav');

if (menuButton && navWrap) {
  menuButton.addEventListener('click', () => {
    const isOpen = navWrap.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}
