import React, { Component } from 'react';
import './style.css';

class WatchSummary extends Component {

  changeSelectedWristbandColor = (color) => this.props.changeSelectedWristbandColor(color);

  render() {
    return <section className="watch-summary-main-section">
      <h1>{this.props.watchName}</h1>
      <h3>{this.props.watchPrice}<span>KR</span></h3>
      <p>{this.props.summary}</p>
      <strong>SELECT WRISTBAND:</strong><span>{this.props.wristbandColor}</span>

      <div>
        {this.props.wristbandColors.map(item => <span title={`Color is: ${item}`} onClick={()=>this.changeSelectedWristbandColor(item)}  style={{backgroundColor:item}}></span>)}
      </div>

      <input type="number" step="1" min="0" value="0"  />
      <button>add to cart</button>
    </section>
  }
}

export default WatchSummary;
