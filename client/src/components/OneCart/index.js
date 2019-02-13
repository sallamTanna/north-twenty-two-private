import React, { Component } from 'react';
import './style.css';

class OneCart extends Component {

  render(){
    return <section className="one-cart-main-section">

      <i class="fas fa-times"></i>
      <img src={this.props.src} />
      <div className="cart-content">
        <span>{this.props.name}</span>
        <span>Unit Price: ${this.props.price}</span>
        <span>Quantity: {this.props.quantity}</span>
      </div>

    </section>
  }
}

export default OneCart;
