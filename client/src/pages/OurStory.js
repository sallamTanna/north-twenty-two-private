import React, { Component } from 'react';
import OurStoryAboutUs from '../components/OurStoryAboutUs';
import OurStoryOurMission from '../components/OurStoryOurMission';
import OurStoryProduction from '../components/OurStoryProduction';
import OurStoryNavigationMenu from '../components/OurStoryNavigationMenu';
import Footer from '../components/Footer';
import './style.css';

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
