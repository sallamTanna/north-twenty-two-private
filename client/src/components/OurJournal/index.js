import React, { Component } from 'react';
import './style.css';

class OurJournal extends Component {
  render() {
    return <section className="our-journal-main-section">
      <figure>
        <a href="testtt">
          <div>
            <h3>Our Journal</h3>
            <p>read all posts</p>
          </div>
        </a>
      </figure>

      <article>
        <h1><a>The NorthTwentytwo Story</a></h1>
        <p>This is a journal about how NorthTwentytwo transitioned from dream to reality. We will cover this in three short segments, the first: when? the second, where? and the third, why? *As you might already be familiar with there is an Our Story page here on our website. This is complementary…</p>
        <a className="our-journal-read-more">read more</a>
      </article>
    </section>
  }
}

export default OurJournal;
