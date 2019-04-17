import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';
import './style.css';

class OurStoryNavigationMenu extends Component {
  state = {
    showMenuIcon1: false,
    showMenuIcon2: false,
    showMenuIcon3: false,
  }

  showMenuIcon = (i)=> {
    if(i===1) {
      return this.setState({showMenuIcon1: true, showMenuIcon2: false, showMenuIcon3: false})
    }
    if(i===2) {
      this.setState({showMenuIcon1: false, showMenuIcon2: true, showMenuIcon3: false})
    }
    if(i===3) {
      this.setState({showMenuIcon1: false, showMenuIcon2: false, showMenuIcon3: true})
    }
  }

  render() {
    return <section className="ourStoryNavigationMenu-main-section">
      <ul>
        <li onClick={()=> this.showMenuIcon(1)} ><i className= {`${this.state.showMenuIcon1?'showMenuIcon1':'hideMenuIcon'}`}><span className='iconify' data-icon="simple-line-icons:list" data-inline="false"></span></i><Scrollchor to="about" className="nav-link">about us</Scrollchor></li>

        <li onClick={()=> this.showMenuIcon(2)}><i className= {`${this.state.showMenuIcon2?'showMenuIcon2':'hideMenuIcon'}`}><span className='iconify'  data-icon="simple-line-icons:list" data-inline="false"></span></i><Scrollchor to="mission" className="nav-link">our mission</Scrollchor></li>

        <li onClick={()=> this.showMenuIcon(3)}><i className= {`${this.state.showMenuIcon3?'showMenuIcon3':'hideMenuIcon'}`}><span className='iconify' data-icon="simple-line-icons:list" data-inline="false"></span></i><Scrollchor to="production" className="nav-link">production</Scrollchor></li>
      </ul>
    </section>
  }
}

export default OurStoryNavigationMenu;
