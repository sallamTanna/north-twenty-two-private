import React, { Component } from 'react';
import reactDom from 'react-dom';
import './style.css';
import HamburgerIcon from './HamburgerIcon.js';
import LogoText from './LogoText.png';

class Menu extends Component{
  constructor(props){
    super(props)
  }
  render() {
    return <section>
      <HamburgerIcon />
    </section>
  }
}

export default Menu;
