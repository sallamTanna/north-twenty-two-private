import React, { Component } from 'react';
import Header from '../components/Header';
import MainImage from '../components/MainImage';
import Categories from '../components/Categories';
import OurStory from '../components/OurStory';
import FeaturedProducts from '../components/FeaturedProducts';
import OurJournal from '../components/OurJournal';
import BeUpdated from '../components/BeUpdated';
import Footer from '../components/Footer';

class Home extends React.Component {

  render() {
    return <main>
      <MainImage />
      <Categories />
      <OurStory />
      <FeaturedProducts />
      <OurJournal />
      <BeUpdated />
    </main>
  }
}

export default Home;
