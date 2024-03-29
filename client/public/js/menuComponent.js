var html = document.getElementsByTagName('html')[0];
var linksBox = document.getElementsByClassName('links-box')[0];
var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
var mainUl = document.getElementsByClassName('main-ul')[0];
var subMenuBtn = document.getElementsByClassName('sub-menu-btn')[0];
var subMenu = document.getElementsByClassName('sub-menu')[0];
var navFooter = document.getElementsByClassName('nav-footer')[0];
var menuCloseIcon = document.getElementsByClassName('menu-close-icon')[0];
var cartsBox = document.getElementsByClassName('carts-box')[0];
var cartIcon = document.getElementsByClassName('cart-icon')[0];
var cartMainSection = document.getElementsByClassName('cart-main-section')[0];
var carts = document.getElementsByClassName('carts')[0];
var oneCartMainSection = document.getElementsByClassName('one-cart-main-section')[0];
var total = document.getElementsByClassName('total')[0];
var cartCloseIcon = document.getElementsByClassName('cart-close-icon')[0];

html.addEventListener('click', (e)=>{

  if (window.innerWidth > 1024) {
    menuCloseIcon.style.display = "none";
    cartCloseIcon.style.display = "none";
    // To prevent closing the "linksBox" then we click on it, and close it whereever we click
    if(e.target == linksBox || e.target == mainUl || e.target == navFooter || e.target == cartsBox || e.target == cartMainSection || e.target == carts || e.target == total || e.target == oneCartMainSection) {
       e.stopPropagation();
    }
    else if(e.target == subMenuBtn) {
      if (subMenu.style.display === "block") {
      subMenu.style.display = "none";
      } else {
      subMenu.style.display = "block";
      }
    }
    else {
      linksBox.style.display = "none";
      hamburgerIcon.style.display = "block";
      cartsBox.style.display = "none";
      cartIcon.style.display = "block";
    }
  }

  // To prevent closing the "linksBox" then we click on it, and close it whereever we click
  if(e.target == linksBox || e.target == mainUl || e.target == navFooter || e.target == cartsBox || e.target == cartMainSection || e.target == carts || e.target == total || e.target == oneCartMainSection) {
     e.stopPropagation();
  }
})
