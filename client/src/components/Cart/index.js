import React, { Component } from 'react';
import './style.css';

class Cart extends Component {
  state = {
    cartNumber: 0,
  }

  openCartMenu = ()=>{
  }

  render() {
    return <section className="cart-main-section" onClick={this.openCartMenu}>
      <span className="cart-text">cart</span>
      <span>{this.state.cartNumber}</span>
    </section>
  }
}

export default Cart;
