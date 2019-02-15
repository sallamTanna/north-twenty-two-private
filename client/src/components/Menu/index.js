import React, { Component } from 'react';
import reactDom from 'react-dom';
import './style.css';
import LogoText from './LogoText.png';

class Menu extends Component{

  openMenu = ()=> {
    var linksBox = document.getElementsByClassName('links-box')[0];
    var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
    var closeIcon = document.getElementsByClassName('menu-close-icon')[0];
    linksBox.style.display = "block";
    hamburgerIcon.style.display = "none";
    closeIcon.style.visibility = "visible";
  }

  closeMenu = ()=> {
    var linksBox = document.getElementsByClassName('links-box')[0];
    var closeIcon = document.getElementsByClassName('menu-close-icon')[0];
    var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
    linksBox.style.display = "none";
    closeIcon.style.visibility = "hidden";
    hamburgerIcon.style.display = "block";
  }

  render() {
    return <section>
      <section className="hamburger-icon" onClick={this.openMenu}>
        <div className="hamburger-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <nav className="links-box">
        <section className="menu-close-icon" onClick={this.closeMenu}>
          <i class="fas fa-times-circle"></i>
        </section>
        <ul className="main-ul">
          <li><a href="#HOME">HOME</a></li>
          <li className="sub-menu-btn">WATCHES</li>
          <div className="sub-menu">
            <li><a href="#ALL WATCHES">ALL WATCHES</a></li>
            <li><a href="#WOMEN'S">WOMEN'S</a></li>
            <li><a href="#MEN'S">MEN'S</a></li>
          </div>
          <li><a href="#WRISTBANDS">WRISTBANDS</a></li>
          <li><a href="#OUR STORY">OUR STORY</a></li>
          <li><a href="#NORTHTWENTYTWO">#NORTHTWENTYTWO</a></li>
          <li><a href="#JOURNAL">JOURNAL</a></li>
          <li><a href="#SUPPORT">SUPPORT</a></li>
        </ul>
        <footer className="nav-footer">
          © 2017 GILLBO GROUP AB. ALL RIGHTS RESERVED.
        </footer>
      </nav>

    </section>
  }
}

export default Menu;
