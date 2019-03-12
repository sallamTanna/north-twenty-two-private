import React, { Component } from 'react';
import OurStoryAboutUs from '../components/OurStoryAboutUs';
import OurStoryOurMission from '../components/OurStoryOurMission';
import OurStoryProduction from '../components/OurStoryProduction';
import OurStoryNavigationMenu from '../components/OurStoryNavigationMenu';
import Footer from '../components/Footer';

class OurStory extends Component {
  render() {
    return <main>
      <OurStoryNavigationMenu />
      <OurStoryAboutUs />
      <OurStoryOurMission />
      <OurStoryProduction />
      <Footer />
    </main>
  }
}

export default OurStory;
