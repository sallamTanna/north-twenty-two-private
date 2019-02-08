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

  render() {
      return <section>
       <section className="hamburger-icon"  onClick={this.openMenu}>
        <div className="hamburger-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
        </section>

        <section className="colse-icon">
          <i class="fas fa-times-circle"></i>
        </section>

        <nav className="links-box">
          <ul className="main-ul">
            <li><a href="#">HOME</a></li>
            <li className="sub-menu-btn">WATCHES</li>
            <div className="sub-menu">
              <li><a>ALL WATCHES</a></li>
              <li><a>WOMEN'S</a></li>
              <li><a>MEN'S</a></li>
            </div>
            <li><a href="#">WRISTBANDS</a></li>
            <li><a href="#">OUR STORY</a></li>
            <li><a href="#">#NORTHTWENTYTWO</a></li>
            <li><a href="#">JOURNAL</a></li>
            <li><a href="#">SUPPORT</a></li>
          </ul>
          <footer className="nav-footer">
            © 2017 GILLBO GROUP AB. ALL RIGHTS RESERVED.
          </footer>
        </nav>
        </section>
  }
}

export default Menu;
