import React, { Component } from 'react';
import './style.css';

class MainImage extends Component {

  test = () => {
    fetch('/test', {
       method: 'get',
       credentials: 'same-origin',
        headers :{'content-type': 'application/json'},
     })
       .then(res => console.log(res))
       .catch((err) => {
         console.log(err)
       });
  }

render(){return <div>
  <p   onClick={this.test} className="app-title">SECURE PAYMENTS & SHIPPING WORLD WIDE</p>
  <section className="main-image-main-section">
    <div>
    <p>CRAFTED FOR THE HARSH AND VARIED YET BEAUTIFUL CLIMATE OF THE NORTH</p>
    <p>Minimalistic Watches</p>
    <p><a href="/store">SHOP NOW</a></p>
    </div>
  </section>
</div>}
}

export default MainImage;
