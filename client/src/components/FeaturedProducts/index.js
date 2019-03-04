import React, { Component } from 'react';
import OneFeatured from '../OneFeatured';
import './style.css';

class FeaturedProducts extends Component {
  state = {
    products: [{name:'sallam', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Bergen-Rose-2-500x500.jpg', href:'test'}]
  }

  render(){
    return <section className="featured-products-main-section">
    {this.state.products.map(product => <OneFeatured name={product.name} price={product.price} src={product.src} href={product.href} />)}

    </section>
  }
}

export default FeaturedProducts;
