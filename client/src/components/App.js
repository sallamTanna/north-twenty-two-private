import React from 'react';
import Header from './Header';
import MainImage from './MainImage';
import Categories from './Categories';
import OurStory from './OurStory';
import FeaturedProducts from './FeaturedProducts';
import './App.css';

class App extends React.Component {

  render() {
    return <main className="app">
      <Header />
      <section className="page-content">
        <MainImage />
        <Categories />
        <OurStory />
        <FeaturedProducts />
      </section>
    </main>
  }
}

export default App;
