import React from 'react';
import Header from './Header';
import MainImage from './MainImage';
import './App.css';

class App extends React.Component {

  render() {
    return <div className="app">
      <Header />
      <p className="app-title">SECURE PAYMENTS & SHIPPING WORLD WIDE</p>
      <MainImage />
    </div>;
  }
}

export default App;
