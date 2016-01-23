import React, { Component } from 'react'

import Loading from '../components/loading'
import OrderList from '../components/orders/order-list'

export default class Marquee extends Component {

  state = {
    text: 'loading'
  }

  componentDidMount() {
    this.setState({text : 'Hi'})
  }
  render() {
    return <h1 className="marquee"><marquee>{this.state.text}</marquee></h1>
  }
}
