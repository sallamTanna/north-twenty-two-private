import React, { Component } from 'react';
import './style.css';

class MoreWatchDetails extends Component {
  render() {
    return <section className="more-watch-details">
      <div><h3>{this.props.watchName}</h3><p>{this.props.summary}</p></div>
      <div><h3>SPECIFICATIONS</h3><p>{this.props.specifications}</p></div>
      <div><h3>DIMENSIONS</h3><p>{this.props.dimensions}</p></div>
    </section>
  }
}

export default MoreWatchDetails;
