import React, { Component } from 'react';
import './style.css';

class Cart extends Component {
    state = {
      cartNumber: 1,
  }

render(){
  return <section className="cart-main-section">
    <span>cart</span>
    <span>{this.state.cartNumber}</span>
  </section>
}
}

export default Cart;
