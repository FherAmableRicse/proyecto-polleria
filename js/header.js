const header = () => {
  const headerNavMenuLinkList = document.getElementById('headerNavMenuLinkList');
  const headerNavMenuIcon = document.getElementById('headerNavMenuIcon');
  const headerNavMenuCloseIcon = document.getElementById('headerNavMenuCloseIcon');
  const headerNavMenuLinkListItems = document.querySelectorAll('.header-nav__menu-link-item');
  const headerNavMenuLinks = document.querySelectorAll('.header-nav__menu-link');


  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.header-nav__menu-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        document.querySelector('.header-nav__menu-link--active')?.classList.remove('header-nav__menu-link--active');
        navLink.classList.add('header-nav__menu-link--active');
      }
    });
  }, {
    threshold: 1.0
  });

  headerNavMenuLinks.forEach(element => {
    const hash = element.getAttribute('href');
    if (hash.includes('#')) {
      const target = document.querySelector(hash);
      if (target) {
        intersectionObserver.observe(target);
      }
    }
    else {
      return;
    }

  });
  const openMenu = () => {
    console.log(headerNavMenuLinkList)
    headerNavMenuLinkList.classList.add('header-nav__menu-link-list--open');
  };

  const closeMenu = () => {
    console.log(headerNavMenuLinkList)
    headerNavMenuLinkList.classList.remove('header-nav__menu-link-list--open');
  };
  headerNavMenuIcon.addEventListener('click', openMenu);
  headerNavMenuCloseIcon.addEventListener('click', closeMenu);
  headerNavMenuLinkListItems.forEach((element) => {
    element.addEventListener('click', closeMenu);
  });

}

export default header;