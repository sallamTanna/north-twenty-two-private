import React, { Component } from 'react';
import OneCart from '../OneCart';
import './style.css';

class Cart extends Component {
  state = {
    cartNumber: 0,
    total: 100,
  }

  openCartMenu = ()=>{
    var cartsBox = document.getElementsByClassName('carts-box')[0];
    var cartIcon = document.getElementsByClassName('cart-icon')[0];
    var cartCloseIcon = document.getElementsByClassName('cart-close-icon')[0];
    var menuCloseIcon = document.getElementsByClassName('menu-close-icon')[0];
    var linksBox = document.getElementsByClassName('links-box')[0];
    var hamburgerIcon = document.getElementsByClassName('hamburger-icon')[0];

    cartsBox.style.display = "block";
    cartIcon.style.display = "none";
    cartCloseIcon.style.visibility = "visible";
    menuCloseIcon.style.visibility = "hidden";
    linksBox.style.display = "none";
    hamburgerIcon.style.display = "block";
  }

  closeCartMenu = ()=>{
    var cartsBox = document.getElementsByClassName('carts-box')[0];
    var cartIcon = document.getElementsByClassName('cart-icon')[0];
    var cartCloseIcon = document.getElementsByClassName('cart-close-icon')[0];

    cartsBox.style.display = "none";
    cartIcon.style.display = "block";
    cartCloseIcon.style.visibility = "hidden";
  }

  render() {
    return <section className="cart-main-section">

      <section className="cart-icon"  onClick={this.openCartMenu}>
        <span className="cart-text">cart</span>
        <span>{this.state.cartNumber}</span>
      </section>

      <section className="cart-close-icon" onClick={this.closeCartMenu}>
        <i class="fas fa-times-circle"></i>
      </section>

      <section className="carts-box">
        <div className="carts">
          <OneCart name={"Saltaro - Gold Mesh"} price={239} quantity={1} src={"https://northtwentytwo.com/wp-content/uploads/2017/01/Saltar%C3%B6-M-1-1024x1024.jpg"}/>
          <OneCart name={"Saltaro - Gold Mesh"} price={239} quantity={1} src={"https://northtwentytwo.com/wp-content/uploads/2017/01/Saltar%C3%B6-M-1-1024x1024.jpg"}/>
          <OneCart name={"Saltaro - Gold Mesh"} price={239} quantity={1} src={"https://northtwentytwo.com/wp-content/uploads/2017/01/Saltar%C3%B6-M-1-1024x1024.jpg"}/>
          <OneCart name={"Saltaro - Gold Mesh"} price={239} quantity={1} src={"https://northtwentytwo.com/wp-content/uploads/2017/01/Saltar%C3%B6-M-1-1024x1024.jpg"}/>
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
