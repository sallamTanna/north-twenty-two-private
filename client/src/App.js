import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Home, OurStory, JournalPage, AllWatchesPage, DetailedWatchPage, StorePage, MenPage, WomenPage, WristbandsPage, JournalPostsPage  } from './pages';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends React.Component {

  render() {
    return <main className="app">
      <Header />
      <section className="page-content">
      <Router>
          <Route exact path="/" component={ Home } />
          <Route exact path="/store" component={ StorePage } />
          <Route exact path="/men-page" component={ MenPage } />
          <Route exact path="/our-story" component={ OurStory } />
          <Route exact path="/women-page" component={ WomenPage  } />
          <Route exact path="/journal-page" component={ JournalPage } />
          <Route exact path="/wristbands" component={ WristbandsPage  } />
          <Route exact path="/all-watches-page" component={ AllWatchesPage } />
          <Route exact path="/journal-posts-page" component={ JournalPostsPage } />
          <Route exact path="/detailed-watch-page" component={ DetailedWatchPage } />
        </Router>
      </section>
      <Footer />
    </main>
  }
}

export default App;
