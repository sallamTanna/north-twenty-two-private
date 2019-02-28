import React, { Component } from 'react';
import './style.css';
import image from './right.jpg';

class OurStory extends Component {
  render(){
    return <section className="ourStory-main-section">
      <div>
        <p>built to last</p>
        <h1>Minimalism & Quality</h1>
        <p>We create minimalistic and qualitative wristwear for every individual and occasion. Our team is based in Stockholm, where we design, partially assemble and package all timepieces by hand.</p>
        <a><span>read more</span></a>
      </div>

      <div>
        <figure>
          <img src={image} />
        </figure>
      </div>

    </section>
  }
}

export default OurStory;
