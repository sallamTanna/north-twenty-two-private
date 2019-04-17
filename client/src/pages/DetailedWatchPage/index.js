import React, { Component } from 'react';
import { WatchSummary, WatchImages, MoreWatchDetails } from '../../components';
import './style.css';

class DetailedWatchPage extends Component {
  state = {
    watch: {},
    selectedImage: '',
    selectedWristbandColor:'',
    buttonText: 'add to cart',
  }

  changeSelectedImage = (index) => this.setState({ selectedImage: this.state.watch.imgs_src[index] })
  changeSelectedWristbandColor = (color) => this.setState({selectedWristbandColor:color})
  changeButtonText = () => this.setState({buttonText: 'item added'})

  componentDidMount() {
    fetch('/displayWatchPage', {
       method: 'post',
       credentials: 'same-origin',
       headers :{'content-type': 'application/json'},
       body: JSON.stringify( {watchId: window.location.pathname.split('/')[2]} )
    })
     .then(response => response.json())
     .then(response => this.setState({ watch: response.response}) )
     .catch((err) => { console.log('Error from front-end ', err) });
  }

  render() {
    return <article>

      <main className="detailed-watch-page">

          {this.state.watch.name? <section className="image-and-summary"><WatchImages src={this.state.selectedImage || this.state.watch.imgs_src[0] } watchCollection={this.state.watch.imgs_src} selectedImage={(index)=> this.changeSelectedImage(index)} />
          <WatchSummary
            watchName={this.state.watch.name}
            watchPrice={this.state.watch.price}
            summary={this.state.watch.summary}
            wristbandColors={this.state.watch.available_colors}
            changeSelectedWristbandColor={(color)=>this.changeSelectedWristbandColor(color)}
            wristbandColor={this.state.selectedWristbandColor}
            buttonText={this.state.buttonText}
            changeButtonText={()=>this.changeButtonText()}
          />
          </section>
            :null
          }

      </main>

      <MoreWatchDetails watchName={this.state.watch.name} more_info={this.state.watch.more_info} specefications={this.state.watch.specefications} dimensions={this.state.watch.dimensions}/>
    </article>
  }
}

export default DetailedWatchPage;
