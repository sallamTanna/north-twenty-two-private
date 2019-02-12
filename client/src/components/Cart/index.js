import React, { Component } from 'react';
import './style.css';

class Cart extends Component {
  state = {
    cartNumber: 0,
    total: 100,
  }

  openCartMenu = ()=>{
    var cartsBox = document.getElementsByClassName('carts-box')[0];
    var cartIcon = document.getElementsByClassName('cart-icon')[0];
    cartsBox.style.display = "block";
    cartIcon.style.display = "none";
  }

  render() {
    return <section>

      <section className="cart-icon"  onClick={this.openCartMenu}>
        <span className="cart-text">cart</span>
        <span>{this.state.cartNumber}</span>
      </section>

      <section className="carts-box">
        <div className="carts">
        </div>

        <div className="total">
          <div className="total-number">
            <span>total</span>
            <span>${this.state.total}</span>
          </div>
          <a href="#viewcart">view cart</a>
          <a href="#checkout">checkout</a>
        </div>
      </section>


    </section>
  }
}

export default Cart;
