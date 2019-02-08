var body = document.getElementsByTagName('body')[0];
var html = document.getElementsByTagName('html')[0];
var linksBox = document.getElementsByClassName('links-box')[0];
var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
var mainUl = document.getElementsByClassName('main-ul')[0];
var subMenuBtn = document.getElementsByClassName('sub-menu-btn')[0];
var subMenu = document.getElementsByClassName('sub-menu')[0];
var navFooter = document.getElementsByClassName('nav-footer')[0];
var closeIcon = document.getElementsByClassName('colse-icon')[0];

body.addEventListener('click', (e)=>{
  // To prevent closing the "linksBox" then we click on it, and close it whereever we click
  if(e.target == linksBox || e.target == mainUl || e.target == navFooter || e.target == html) {
    console.log('vvvvvvvvvvvv');
      e.stopPropagation();
  }
  else if(e.target == subMenuBtn) {
    if (subMenu.style.display === "block") {
    subMenu.style.display = "none";
    } else {
    subMenu.style.display = "block";
    }
  }

   if(html.style.width == "425px") {
    console.log('sssssssssssssssssssssssss');
    hamburgerIcon.style.display = "none";
    closeIcon.style.visibility = "visible";
    closeIcon.style.display = "block";
  }

  else {
    linksBox.style.display = "none";
    hamburgerIcon.style.display = "block";
  }
})
