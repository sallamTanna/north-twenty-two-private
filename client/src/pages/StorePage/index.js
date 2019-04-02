import React, { Component } from 'react';
import { OneFeatured } from '../../components'
import './style.css';

class StorePage extends Component {
  state = {
    watchesList:[{name:'aaaaaa', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Bergen-Rose-2-500x500.jpg', href:'/detailed-watch-page'}, {name:'Lana', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Vaxholm-S.jpg', href:'/detailed-watch-page'}, {name:'Salam', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/08/Oslo-Ros-36mm-500x500.jpg', href:'test'}, {name:'Reema', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Svarts%C3%B6-M-1-500x500.jpg', href:'test'},{name:'Dana', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Bergen-Rose-2-500x500.jpg', href:'test'}, {name:'Lana', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Vaxholm-S.jpg', href:'test'}, {name:'Salam', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/08/Oslo-Ros-36mm-500x500.jpg', href:'test'}, {name:'Reema', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Svarts%C3%B6-M-1-500x500.jpg', href:'test'},{name:'Dana', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2016/06/Bergen-Rose-2-500x500.jpg', href:'test'}, {name:'Lana', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Vaxholm-S.jpg', href:'test'}, {name:'Salam', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/08/Oslo-Ros-36mm-500x500.jpg', href:'test'}, {name:'Reema', price:1.395, src:'https://northtwentytwo.com/wp-content/uploads/2017/01/Svarts%C3%B6-M-1-500x500.jpg', href:'test'}]
  }

  render() {
    return <main className="store-page">
      <h1>Store</h1>
      <section>
        {this.state.watchesList.map(watch => <OneFeatured name={watch.name} price={watch.price} src={watch.src} href={watch.href} />)}
      </section>
    </main>
  }
}

export default StorePage;
