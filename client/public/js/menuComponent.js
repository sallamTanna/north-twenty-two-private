var body = document.getElementsByTagName('body')[0];
var linksBox = document.getElementsByClassName('links-box')[0];
var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
var mainUl = document.getElementsByClassName('main-ul')[0];
var subMenuBtn = document.getElementsByClassName('sub-menu-btn')[0];
var subMenu = document.getElementsByClassName('sub-menu')[0];
var navFooter = document.getElementsByClassName('nav-footer')[0];

// To prevent closing the "linksBox" then we click on it, and close it whereever we click
body.addEventListener('click', (e)=>{
  if(e.target == linksBox || e.target == mainUl || e.target == navFooter) {
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
  }
})
