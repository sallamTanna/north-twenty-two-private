import React, { Component } from 'react';
import { OneFeatured } from '../../components';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import './style.css';
const loadingComponent = css`
    padding: 20px;
    margin-bottom: 80px;
`;
const loadingDivStyle = {
  textAlign: 'center',
};


class WomenPage  extends Component {
  state = {
    womenWatches:[]
  }

  componentDidMount() {
    fetch('/getAllWatches', {
       method: 'get',
       credentials: 'same-origin',
       headers :{'content-type': 'application/json'},
    })
     .then(response => response.json())
     .then(response =>  this.setState({ womenWatches: response.response.filter(watch => watch.gender === 'female' )}))
     .catch((err) => console.log('Error from front-end ', err));
  }

  render() {
    return <main className="women-page">
      <h1>Women's</h1>
      <section>
        {this.state.womenWatches.length>0? this.state.womenWatches.map(watch => <OneFeatured name={watch.name} price={watch.price} src={watch.src} href={watch.href} />)
        : <div style={ loadingDivStyle }><ClipLoader color={'#5d7b92'} css={ loadingComponent } /></div>}
      </section>
    </main>
  }
}

export default WomenPage;
