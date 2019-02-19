import React, { Component } from 'react';
import Cart from '../Cart';
import Menu from '../Menu';
import LogoText from './LogoText.png';
import './style.css';

class Header extends Component {
  render(){
    return <header className="header-main-section">
      <Menu />
      <a href="#"><img src={LogoText} className="LogoText"/></a>
      <Cart />
    </header>
  }
}

export default Header;
