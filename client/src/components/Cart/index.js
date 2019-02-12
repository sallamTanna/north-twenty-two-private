import React, { Component } from 'react';
import './style.css';

class Cart extends Component {
  state = {
    cartNumber: 0,
  }

  openCartMenu = ()=>{
    var cartsBox = document.getElementsByClassName('carts-box')[0];
    var cartIcon = document.getElementsByClassName('cart-icon')[0];
    cartsBox.style.display = "block";
    cartIcon.style.display = "none";
  }

  render() {
    return <section>

      <section onClick={this.openCartMenu} className="cart-icon">
        <span className="cart-text">cart</span>
        <span>{this.state.cartNumber}</span>
      </section>

      <section className="carts-box">
      </section>


    </section>
  }
}

export default Cart;
