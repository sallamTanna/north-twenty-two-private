import React from 'react';
import Header from './Header';
import MainImage from './MainImage';
import Categories from './Categories';
import './App.css';

class App extends React.Component {

  render() {
    return <main className="app">
      <Header />
      <section className="page-content">
        <MainImage />
        <Categories />
      </section>
    </main>
  }
}

export default App;
