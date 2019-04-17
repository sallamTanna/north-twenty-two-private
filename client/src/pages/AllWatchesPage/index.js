import React, { Component } from 'react';
import { OneFeatured } from '../../components';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import './style.css';
const loadingDivStyle = {
  textAlign: 'center',
};
const loadingComponent = css`
    padding: 20px;
    margin-bottom: 80px;
`;

class AllWatchesPage extends Component {
  state = {
    watchesList:[],
  }

  openDetailedPage = (watchId) => {
    window.location = "/detailed-watch-page/"+watchId;
  }

  componentDidMount() {
    fetch('/getAllWatches', {
       method: 'get',
       credentials: 'same-origin',
       headers :{'content-type': 'application/json'},
    })
     .then(response => response.json())
     .then(response =>this.setState({ watchesList: response.response }))
     .catch((err) => { console.log('Error from front-end ', err) });
  }

  render() {
    return <div className="all-watches-page">
      <h1>Watches</h1>
      <section>
        {this.state.watchesList.length>0? this.state.watchesList.map(watch => <OneFeatured name={watch.name} price={watch.price} src={watch.src} href={watch.href} onClick={()=> this.openDetailedPage(watch._id)} />)
        : <div style={ loadingDivStyle }><ClipLoader color={'#5d7b92'} css={ loadingComponent } /></div>
        }
      </section>
    </div>
  }
}

export default AllWatchesPage;
