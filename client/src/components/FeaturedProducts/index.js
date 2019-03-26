import React, { Component } from 'react';
import OneFeatured from '../OneFeatured';
import './style.css';

class FeaturedProducts extends Component {
  state = {
    products: [{name:'Dana', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Bergen-Rose-2-500x500.jpg', href:'test'}, {name:'Lana', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Vaxholm-S.jpg', href:'test'}, {name:'Salam', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/08/Oslo-Ros-36mm-500x500.jpg', href:'test'}, {name:'Reema', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Svarts%C3%B6-M-1-500x500.jpg', href:'test'}],
  }

  render(){
    return <section className="featured-products-main-section">
    <p>Featured Products</p>
    {this.state.products.map(product => <OneFeatured name={product.name} price={product.price} src={product.src} href={product.href} />)}
    </section>
  }
}

export default FeaturedProducts;
