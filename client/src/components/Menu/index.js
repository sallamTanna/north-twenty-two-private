import React, { Component } from 'react';
import reactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './style.css';

class Menu extends Component{

  openMenu = ()=> {
    var linksBox = document.getElementsByClassName('links-box')[0];
    var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];
    var closeIcon = document.getElementsByClassName('menu-close-icon')[0];
    var cartCloseIcon = document.getElementsByClassName('cart-close-icon')[0];
    var cartsBox = document.getElementsByClassName('carts-box')[0];
    var cartIcon = document.getElementsByClassName('cart-icon')[0];

    linksBox.style.display = "block";
    hamburgerIcon.style.display = "none";
    closeIcon.style.visibility = "visible";
    cartCloseIcon.style.visibility = "hidden";
    cartsBox.style.display = "none";
    cartIcon.style.display = "block";
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
    return <menu>
      <section className="hamburger-icon" onClick={this.openMenu}>
        <div className="hamburger-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <section className="menu-close-icon" onClick={this.closeMenu}>
      <i class="fas fa-times-circle"></i>
      </section>

      <nav className="links-box">
        <ul className="main-ul">
          <a href="/"><li>HOME</li></a>
          <a><li className="sub-menu-btn">WATCHES</li></a>
          <div className="sub-menu">
            <a href="/all-watches-page"><li>ALL WATCHES</li></a>
            <a href="#WOMEN'S"><li>WOMEN'S</li></a>
            <a href="/men-page"><li>MEN'S</li></a>
          </div>
          <a href="#WRISTBANDS"><li>WRISTBANDS</li></a>
          <a href="/our-story"><li>OUR STORY</li></a>
          <a href="#NORTHTWENTYTWO"><li>#NORTHTWENTYTWO</li></a>
          <a href="/journal-page"><li>JOURNAL</li></a>
          <a href="#SUPPORT"><li>SUPPORT</li></a>
        </ul>
        <footer className="nav-footer">
          © 2017 GILLBO GROUP AB. ALL RIGHTS RESERVED.
        </footer>
      </nav>

    </menu>
  }
}

export default Menu;
