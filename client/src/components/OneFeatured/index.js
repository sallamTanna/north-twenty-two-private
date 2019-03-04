import React, { Component } from 'react';
import './style.css';

class OneFeatured extends Component {
  render() {
    return <section className="one-featured-main-section">
      <li>
        <figure>
          <img src={this.props.src} />
          <div className="select-option-button"><span>select options</span></div>
        </figure>
        <div className="more-details">
          <h3><a href={this.props.href}>{this.props.name}</a></h3>
          <span>{this.props.price}<span className="lighter-span"> KR</span></span>
        </div>
      </li>
    </section>
  }
}

export default OneFeatured;
