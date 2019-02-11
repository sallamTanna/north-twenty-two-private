import React from 'react';
import Menu from './Menu';
import Cart from './Cart';

class App extends React.Component {

  render() {
    return <div className="app">
      <Menu />
      <Cart />
    </div>;
  }
}

export default App;
