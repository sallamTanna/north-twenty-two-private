import React, { Component } from 'react';
import './style.css';

class Cart extends Component {
  state = {
    cartNumber: 0,
  }

  openCartMenu = ()=>{
    console.log('ddddddddd');
    console.log('yyyyyyyyyyy');
  }

  render() {
    return <section className="cart-main-section" onClick={this.openCartMenu}>
      <span className="cart-text">cart</span>
      <span>{this.state.cartNumber}</span>

      <nav className="links-box">
        <section className="colse-icon" onClick={this.closeMenu}>
          <i class="fas fa-times-circle"></i>
        </section>
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

export default Cart;
