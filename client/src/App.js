import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { Home, OurStory, JournalPage } from './pages';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {

  render() {
    return <main className="app">
      <Header />
      <section className="page-content">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/our-story" component={OurStory} />
          <Route exact path="/journal-page" component={JournalPage} />
        </Router>
      </section>
      <Footer />
    </main>
  }
}

export default App;
