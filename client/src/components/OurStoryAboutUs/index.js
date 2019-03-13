import React, { Component } from 'react';
import './style.css';

class OurStoryAboutUs extends Component {
  render() {
    return <section className="ourStoryAboutUs-main-section" id="about">
      <p>THE STORY OF NORTHTWENTYTWO</p>
      <p>Crafted for the rough yet beautiful climate of the north</p>
      <p>The NorthTwentytwo story is simple. It started with the idea of building high quality watches, ready to deal with the harsh, varied yet beautiful climate of the North. Our brand was founded in 2014, twenty two kilometers north of the Swedish capital, Stockholm. Hence the name NorthTwentytwo was born and our story began.</p>
      <figure>
        <img src="https://northtwentytwo.com/wp-content/uploads/2017/02/post1.jpg" />
        <img src="https://northtwentytwo.com/wp-content/uploads/2017/05/Visby.jpg"/>
        <img src="https://northtwentytwo.com/wp-content/uploads/2017/05/Visby.jpg" />
      </figure>
    </section>
  }
}

export default OurStoryAboutUs;
