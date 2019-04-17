import React, { Component } from 'react';
import './style.css';

class OneFeatured extends Component {
  render() {
    return <section className="one-featured-main-section">
      <li>
          <figure>
            <img src={this.props.src} />
            <a onClick={this.props.onClick}>
              <div className="select-option-button">
              <span>select options</span>
              </div>
            </a>
          </figure>

          <div className="more-details">
              <h3>{this.props.name}</h3>
              <span>{this.props.price}<span className="lighter-span"> KR</span></span>
          </div>
      </li>
    </section>
  }
}

export default OneFeatured;
