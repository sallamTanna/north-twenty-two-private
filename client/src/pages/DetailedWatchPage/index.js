import React, { Component } from 'react';
import { WatchSummary, WatchImages } from '../../components';
import './style.css';

class DetailedWatchPage extends Component {
  state = {
    watchCollection: ['https://northtwentytwo.com/wp-content/uploads/2016/12/Saltarö-Dark-Brown-Leather-500x500.jpg', 'https://northtwentytwo.com/wp-content/uploads/2017/01/Vaxholm-S.jpg', 'https://northtwentytwo.com/wp-content/uploads/2017/08/Oslo-Ros-36mm-500x500.jpg', 'https://northtwentytwo.com/wp-content/uploads/2017/01/Svarts%C3%B6-M-1-500x500.jpg'],
    selectedImage: '',
    wristbandColors:['#d9cba1', 'black'],
    selectedWristbandColor:'',
    buttonText: 'add to cart',
  }

  changeSelectedImage = (index) => this.setState({ selectedImage: this.state.watchCollection[index] })
  changeSelectedWristbandColor = (color) => this.setState({selectedWristbandColor:color})
  changeButtonText = () => this.setState({buttonText: 'item added'})

  render() {
    return <main className="detailed-watch-page">
      <WatchImages src={this.state.selectedImage || this.state.watchCollection[0]} watchCollection={this.state.watchCollection} selectedImage={(index)=> this.changeSelectedImage(index)} />

      <WatchSummary watchName={'sallam'} watchPrice={'15'} summary={'Saltarö is inspired by the Stockholm archipelago which is seen in many aspects of the design. Powered by a Swiss Ronda movement then protected by 316l stainless steel and dome sapphire crystal with anti reflective coating. The brushed light rose gold case combined with a white face gives the timepiece a refined look. Available with either a magnetic mesh or genuine Italian leather wristband.'} wristbandColors={this.state.wristbandColors} changeSelectedWristbandColor={(color)=>this.changeSelectedWristbandColor(color)} wristbandColor={this.state.selectedWristbandColor} buttonText={this.state.buttonText} changeButtonText={()=>this.changeButtonText()} />
    </main>
  }
}

export default DetailedWatchPage;
