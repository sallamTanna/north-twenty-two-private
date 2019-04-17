import React, { Component } from 'react';
import { Post } from '../../components';
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

class JournalPostsPage extends Component {
  state = {
    posts: [],
  }

componentDidMount() {

  fetch('/getAllPosts', {
     method: 'get',
     credentials: 'same-origin',
     headers :{'content-type': 'application/json'},
  })
   .then(response => response.json())
   .then(response => { this.setState({ posts: response.response })})
   .catch((err) => { console.log('Error from front-end ', err) });
}

  render() {
    return <main className="journal-posts-page">
      <h1>A Independent Watch Brand</h1>
      {this.state.posts.length > 0? this.state.posts.map(post => <Post src={post.src} date={post.date.split(['T'])[0]} title={post.title} summary={post.summary}/>)
      : <div style={ loadingDivStyle }><ClipLoader color={'#5d7b92'} css={ loadingComponent } /></div>}
    </main>
  }
}

export default JournalPostsPage;
