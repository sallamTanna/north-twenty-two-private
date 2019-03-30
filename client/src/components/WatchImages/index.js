import React, { Component } from 'react';
import './style.css';

class WatchImages extends Component {
  state = {
    clickedImageIndex:0,
  }

  changeSelectedImage = (imageIndex)=> {
    var arrayOfWatches = document.getElementsByClassName('watch-images-order-list')[0];
    var mainImage = document.getElementsByClassName('watch-images-main-image')[0];
    for (let i=0; i<arrayOfWatches.children.length; i++) {
      arrayOfWatches.children[i].style.opacity = '.5'
    }
    arrayOfWatches.children[imageIndex].style.opacity = '1';
    return this.props.selectedImage(imageIndex)
  }

  render() {
    return <section className="watch-images-main-section">
      <ol className='watch-images-order-list'>
        {this.props.watchCollection.map((item, index)=> <li><img src={item} onClick={()=> this.changeSelectedImage(index)} /></li> )}
      </ol>

      <figure>
        <img className="watch-images-main-image" src={this.props.src} />
      </figure>
    </section>
  }
}

export default WatchImages;
