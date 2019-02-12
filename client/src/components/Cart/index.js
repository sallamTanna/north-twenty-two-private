import React, { Component } from 'react';
import './style.css';

class Cart extends Component {
  state = {
    cartNumber: 0,
  }

  openCartMenu = ()=>{
    console.log('ddddddddd');
    var cartsBox = document.getElementsByClassName('carts-box')[0];
    cartsBox.style.display = "block";
  }

  render() {
    return <section className="cart-main-section" onClick={this.openCartMenu}>
      <span className="cart-text">cart</span>
      <span>{this.state.cartNumber}</span>

      <section className="carts-box">
    
      </section>

    </section>
  }
}

export default Cart;
