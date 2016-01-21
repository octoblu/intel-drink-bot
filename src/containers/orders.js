import React, { Component } from 'react'

import Loading from '../components/loading'
import OrderList from '../components/orders/order-list'

export default class Orders extends Component {
  render() {
    return <div>
      <OrderList/>
    </div>
  }
}
