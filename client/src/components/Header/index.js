import React, { Component } from 'react';
import Cart from '../Cart';
import Menu from '../Menu';
import LogoText from './LogoText.png';
import './style.css';

class Header extends Component {
  render(){
    return <section className="header-main-section">
      <Menu />
      <div>
        <img src={LogoText} className="LogoText"/>
      </div>
      <Cart />
    </section>
  }
}

export default Header;
