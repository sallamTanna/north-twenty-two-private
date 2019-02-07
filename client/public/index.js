var body = document.getElementsByTagName('body')[0];
var linksBox = document.getElementsByClassName('links-box')[0];
var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
var mainUl = document.getElementsByClassName('main-ul')[0];

// To prevent closing the "linksBox" then we click on it, and close it whereever we click
body.addEventListener('click', (e)=>{
  if(e.target == linksBox || e.target == mainUl) {
      e.stopPropagation();
  }
  else {
    linksBox.style.display = "none";
    hamburgerIcon.style.display = "block";
  }
})
























//
//
//
//
//
//
//
// body.addEventListener('click', (e)=>{
//   if(e.target.parentNode.isEqualNode(mainUl)) {
//     e.stopPropagation();
//   } else {
//     linksBox.style.display = "none";
//     hamburgerIcon.style.display = "block";
//   }
// })
