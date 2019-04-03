import React, { Component } from 'react';
import { Post } from '../../components';
import './style.css';

class JournalPostsPage extends Component {
  state = {
    posts: [{src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Trondheim-Theme-4.jpg-1024x1024-960x960.jpeg', date:'08 . 22 . 17', title:'ANTI-REFLECTIVE COATING', summary:'Using anti-reflective coating is usually common among models from very high-end and expensive watch brands. An abbreviation you might have…'}, {src:'https://northtwentytwo.com/wp-content/uploads/2016/11/saltaro-42m-960x960.jpg', date:'08 . 22 . 17', title:'MAGNETIC MESH WRISTBAND', summary:'We are the first regular watch brand to introduced stainless steel mesh wristbands with a magnetic closure. By regular we do not…'}, {src:'https://northtwentytwo.com/wp-content/uploads/2017/06/mesh-960x960.jpg', date:'08 . 22 . 17', title:'THE NORTHTWENTYTWO STORY', summary:'This is a journal about how NorthTwentytwo transitioned from dream to reality. We will cover this in three short segments,…'}, {src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Trondheim-Theme-4.jpg-1024x1024-960x960.jpeg', date:'08 . 22 . 17', title:'THE NORTHTWENTYTWO STORY', summary:'This is a journal about how NorthTwentytwo transitioned from dream to reality. We will cover this in three short segments,…'},  {src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Trondheim-Theme-4.jpg-1024x1024-960x960.jpeg', date:'08 . 22 . 17', title:'THE NORTHTWENTYTWO STORY', summary:'This is a journal about how NorthTwentytwo transitioned from dream to reality. We will cover this in three short segments,…'},  {src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Trondheim-Theme-4.jpg-1024x1024-960x960.jpeg', date:'08 . 22 . 17', title:'THE NORTHTWENTYTWO STORY', summary:'This is a journal about how NorthTwentytwo transitioned from dream to reality. We will cover this in three short segments,…'}]
  }
  render() {
    return <main className="journal-posts-page">
      <h1>A Independent Watch Brand</h1>
      {this.state.posts.map(post => <Post src={post.src} date={post.date} title={post.title} summary={post.summary}/>)}
    </main>
  }
}

export default JournalPostsPage;
