import React, { Component } from 'react';
import './style.css';

class Categories extends Component {
  render(){
    return <section className="gategory-main-section">
    <a href="/women-page"><p>for here</p></a>
    <a href="/men-page"><p>for him</p></a>
    <a href="/wristbands"><p>wristbands</p></a>
    </section>
  }
}

export default Categories;
