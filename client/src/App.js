import React from 'react';
import Header from './components/Header';
import './App.css';
import { Home, OurStory } from './pages';

class App extends React.Component {

  render() {
    return <main className="app">
      <Header />
      <section className="page-content">
        <OurStory />
      </section>
    </main>
  }
}

export default App;
