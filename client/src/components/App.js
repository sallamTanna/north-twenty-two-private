import React from 'react';
import Header from './Header';
import MainImage from './MainImage';
import OurStory from './OurStory';
import Categories from './Categories';
import './App.css';

class App extends React.Component {

  render() {
    return <main className="app">
      <Header />
      <section className="page-content">
        <MainImage />
        <Categories />
        <OurStory />
      </section>
    </main>
  }
}

export default App;
