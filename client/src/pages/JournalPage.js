import React, { Component } from 'react';
import Footer from '../components/Footer';

class JournalPage extends Component {
  render() {
    return <main className="journal-page">
      <section>
        <p>This is a journal about how NorthTwentytwo transitioned from dream to reality. We will cover this in three short segments, the first: <em>when?</em> the second, <em>where?</em> and the third, <em>why?</em></p>

        <p><em>*As you might already be familiar with there is an Our Story page here on our website. This is complementary information to that, we recommend you reading both!</em></p>

        <p><h1><strong>When?</strong></h1>

        The first brain-storming session occurred during 2013, during this year the first sketches were also made. But the actual brand was founded during 2014. Something seen in our iconic cross logo used on for example the back of the Nord collection watches.</p>

        <p><h1><strong>Where?</strong></h1>

        Most of the first months of long nights filled with hard work, little to no sleep and probably an unhealthy amount of caffeine took place in a suburb just north of Stockholm. This suburb, where the two founders were raised and became friends, happens to be located 22 kilometers north of the Swedish capital, hence the name NorthTwentytwo.
        </p>

        <p><h1><strong>Why?</strong></h1>

        We wanted to make a watch that would last decades without a matching expensive price tag, which means focus on quality and affordability. We also wanted to design beautiful minimalistic timepieces, which means focus on design and timelessness. So NorthTwentytwo is a brand that truly crossed form with function. Seen in all of our watch collections and everything we do.</p>

        <p>In a future journal we introduce our two founders so stay tuned for that! As always, if you have suggestions for future journals or have any questions about this month’s journal, do not hesitate to contact us. You can email us at info@northtwentytwo.com, chat with us at our website, comment down below or send a message on social media.</p>
      </section>

      <div>
        <a><i className="fab fa-twitter"></i></a>
        <a><i className="fab fa-facebook-f"></i></a>
        <a><i className="fab fa-google-plus-g"></i></a>
        <a><i className="fab fa-pinterest"></i></a>
        <a><i className="fab fa-linkedin-in"></i></a>
      </div>
    </main>
  }
}

export default JournalPage;
