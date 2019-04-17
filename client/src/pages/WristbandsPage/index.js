import React, { Component } from 'react';
import { OneFeatured } from '../../components';
import './style.css';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
const loadingComponent = css`
    padding: 20px;
    margin-bottom: 80px;
`;
const loadingDivStyle = {
  textAlign: 'center',
};


class WristbandsPage extends Component {
  state = {
    wristbands:[]
  }

  componentDidMount() {
    fetch('/getAllWristbands', {
       method: 'get',
       credentials: 'same-origin',
       headers :{'content-type': 'application/json'},
    })
     .then(response => response.json())
     .then(response =>  this.setState({ wristbands: response.response }))
     .catch((err) => console.log('Error from front-end ', err));
  }

  render() {
    return <main className="wristbands-page">
      <h1>Wristbands</h1>
      <section>
        {this.state.wristbands.length > 0? this.state.wristbands.map(watch => <OneFeatured name={watch.name} price={watch.price} src={watch.src} href={watch.href} />)
        : <div style={ loadingDivStyle }><ClipLoader color={'#5d7b92'} css={ loadingComponent } /></div>}
      </section>
    </main>
  }
}

export default WristbandsPage;
