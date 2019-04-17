import React, { Component } from 'react';
import './style.css';

class Post extends Component {
  render() {
    const date = this.props.date.split('-');

    return <section className="post-main-section">
      <figure>
        <img src={this.props.src} />
      </figure>
      <summary>
        <h3>{`${date[0].substring(2,)} . ${date[1]} . ${date[2]}`}</h3>
        <h2>{this.props.title}</h2>
        <p>{this.props.summary}</p>
        <a href={this.props.href}>read more</a>
      </summary>
    </section>
  }
}

export default Post;
