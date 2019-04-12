import React, { Component } from 'react';
import './style.css';

class BeUpdated  extends Component {
  render() {
    return <section className="be-updated-main-section">
      <article>
        <p>Want to stay updated?</p>
      </article>

      <section className="main-container">
        <div>
          <p>We love to hang out in social networks. <br/>Come and say hello!</p>
          <p>
            <a href="https://www.facebook.com/northtwentytwoofficial/" target="_blank" rel="noopener">
              <img class="socialikon" src="https://northtwentytwo.com/wp-content/uploads/2017/11/FB.png"/>
            </a>
            <a href="https://twitter.com/northtwentytwo" target="_blank" rel="noopener">
              <img class="twitter socialikon" src="https://northtwentytwo.com/wp-content/uploads/2017/11/TW.png"/>
            </a>
            <a href="http://instagram.com/northtwentytwo/" target="_blank" rel="noopener">
              <img class="socialikon" src="https://northtwentytwo.com/wp-content/uploads/2017/11/IG.png"/>
            </a>
            <a href="mailto:info@northtwentytwo.com" target="_blank" rel="noopener">
              <img class="chat socialikon" src="https://northtwentytwo.com/wp-content/uploads/2017/11/CH.png"/>
            </a>
          </p>
        </div>

        <div>
          <p>Be first to get news and offers. Don’t worry,<br/> we hate spam too.</p>
          <form>
            <input type="email" placeholder="E-mail"/>
            <input type="image" alt="img" src="https://northtwentytwo.com/wp-content/uploads/2017/11/add-circular-outlined-button.png"/>
          </form>
        </div>
      </section>
    </section>
  }
}

export default BeUpdated ;




