import React, { Component } from 'react';
import { Header, MainImage,Categories, OurStory, FeaturedProducts, OurJournal, BeUpdated, Footer } from '../../components';

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
