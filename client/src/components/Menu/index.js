import React, { Component } from 'react';
import reactDom from 'react-dom';
import './style.css';
import LogoText from './LogoText.png';

class Menu extends Component{
  constructor(props){
    super(props)
  }

  openMenu = ()=> {
    var linksBox = document.getElementsByClassName('links-box')[0];
    var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
    linksBox.style.display = "block";
    hamburgerIcon.style.display = "none";
  }

  openSubMenu = ()=> {
    return console.log('fffffffffffff');
  }

  render() {
      return <section>
       <section className="hamburger-icon">
        <div className="hamburger-box" onClick={this.openMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        </section>

        <nav className="links-box">
          <ul className="main-ul">
            <li onClick={this.openSubMenu}><a href="#">HOME</a></li>
            <li onClick={this.openSubMenu}><a href="#">WATCHES</a></li>
            <li onClick={this.openSubMenu}><a href="#">WRISTBANDS</a></li>
            <li onClick={this.openSubMenu}><a href="#">OUR STORY</a></li>
            <li onClick={this.openSubMenu}><a href="#">#NORTHTWENTYTWO</a></li>
            <li onClick={this.openSubMenu}><a href="#">JOURNAL</a></li>
            <li onClick={this.openSubMenu}><a href="#">SUPPORT</a></li>
          </ul>
          <footer className="navFooter">
            © 2017 GILLBO GROUP AB. ALL RIGHTS RESERVED.
          </footer>
        </nav>
        </section>
  }
}

export default Menu;
