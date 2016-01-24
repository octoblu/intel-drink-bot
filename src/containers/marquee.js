import React, { Component } from 'react'

import Loading from '../components/loading'
import OrderList from '../components/orders/order-list'

export default class Marquee extends Component {

  state = {
    text: 'loading'
  }

  componentDidMount() {
    this.setState({text: 'hi'})
  }

  render() {

    return <div id="marquee">
        <input onKeyDown={self.setText}/>
        <h1><marquee>{this.state.text}</marquee></h1>
      </div>
  }

}
