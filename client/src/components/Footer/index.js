import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
  render() {
    return <section className="footer-main-section">
      <article className="three-top-boxes">
        <div>
          <img src="https://northtwentytwo.com/wp-content/uploads/2017/10/Credit-Card.png" />
          <span>SECURE PAYMENTS</span>
        </div>

        <div>
          <img src="https://northtwentytwo.com/wp-content/uploads/2017/10/box.png" />
          <span>SMOOTH RETURNS</span>
        </div>

        <div>
          <img src="https://northtwentytwo.com/wp-content/uploads/2017/10/truck.png" />
          <span>SHIPPING WORLD WIDE</span>
        </div>
      </article>

      <section className="footer-body">
        <div>
          <h3>SUPPORT</h3>
          <a>TERMS & CONDITIONS</a>
          <a>SHIPPING & DELIVERY</a>
          <a>INSTRUCTIONS</a>
        </div>

        <div>
          <h3>CONTACT</h3>
          <p>NORTHTWENYTWO (OFFICE)<br/>BERGSBOVÄGEN 14, 191 48, SOLLENTUNA E-POST:<br/>INFO@NORTHTWENTYTWO.COM</p>
          <img src="https://northtwentytwo.com/wp-content/uploads/2017/07/paymentinkklarna.jpg" alt="Payment" />
        </div>

        <div>
        <h3>SOCIAL</h3>
        <a>INSTAGRAM</a>
        <a>FACEBOOK</a>
        <a>TWITTER</a>
        </div>

      </section>

    </section>
  }
}

export default Footer;
