import React, { Component } from 'react';
import { OurStoryAboutUs, OurStoryOurMission, OurStoryProduction, OurStoryNavigationMenu, Footer } from '../../components';

class OurStory extends Component {
  render() {
    return <main>
      <section className="ourStory-page">
        <OurStoryNavigationMenu />
        <OurStoryAboutUs />
        <OurStoryOurMission />
        <OurStoryProduction />
      </section>
    </main>
  }
}

export default OurStory;
