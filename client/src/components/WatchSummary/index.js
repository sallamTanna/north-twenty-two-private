import React, { Component } from 'react';
import './style.css';

class WatchSummary extends Component {

  changeSelectedWristbandColor = (color) => this.props.changeSelectedWristbandColor(color);
  changeButtonText = () => this.props.changeButtonText();


  render() {
    return <section className="watch-summary-main-section">
      <h1>{this.props.watchName}</h1>
      <h3>{this.props.watchPrice}<span>KR</span></h3>
      <p>{this.props.summary}</p>
      <strong>SELECT WRISTBAND:</strong><span>{this.props.wristbandColorName}</span>

      <div>
        {this.props.wristbandColors? this.props.wristbandColors.map(item => <span title={`Color is: ${item}`} onClick={()=>this.changeSelectedWristbandColor(item)}  style={{backgroundColor:item}}></span>): null}
      </div>

      <input type="number" step="1" min="0" value="0"  />
      <button onClick={()=>this.changeButtonText()}>{this.props.buttonText}</button>
    </section>
  }
}

export default WatchSummary;
