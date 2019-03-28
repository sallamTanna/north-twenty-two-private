import React, { Component } from 'react';
import { WatchSummary, WatchImages } from '../../components';
import './style.css';

class DetailedWatchPage extends Component {
  state = {
    watchCollection: ['https://northtwentytwo.com/wp-content/uploads/2016/12/Saltarö-Dark-Brown-Leather-500x500.jpg', 'https://northtwentytwo.com/wp-content/uploads/2017/01/Vaxholm-S.jpg', 'https://northtwentytwo.com/wp-content/uploads/2017/08/Oslo-Ros-36mm-500x500.jpg', 'https://northtwentytwo.com/wp-content/uploads/2017/01/Svarts%C3%B6-M-1-500x500.jpg'],
    selectedImage: '',
  }

  changeSelectedImage = (index) => this.setState({ selectedImage: this.state.watchCollection[index] })

  render() {
    return <main className="detailed-watch-page">
      <WatchImages src={this.state.selectedImage || this.state.watchCollection[0]} watchCollection={this.state.watchCollection} selectedImage={(index)=> this.changeSelectedImage(index)}/>
    </main>
  }
}

export default DetailedWatchPage;
