import React, { Component } from 'react';
import { OneFeatured } from '../../components'
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

class StorePage extends Component {
  state = {
    watches:[]
  }

  componentDidMount() {
    fetch('/getAllWatches', {
       method: 'get',
       credentials: 'same-origin',
       headers :{'content-type': 'application/json'},
    })
     .then(response => response.json())
     .then(response =>  this.setState({ menWatches: response.response.filter(watch => watch.gender === 'male' )}))
     .catch((err) => console.log('Error from front-end ', err));
  }

  render() {
    return <main className="store-page">
      <h1>Store</h1>
      <section>
        {this.state.watches.length>0? this.state.watches.map(watch => <OneFeatured name={watch.name} price={watch.price} src={watch.src} href={watch.href} />)
        : <div style={ loadingDivStyle }><ClipLoader color={'#5d7b92'} css={ loadingComponent } /></div>}
      </section>
    </main>
  }
}

export default StorePage;
