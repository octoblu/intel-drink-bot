import React, { Component } from 'react'
import { Link } from 'react-router'
import Loading from '../components/loading'

export default class Hub extends Component {
  render() {
    return <ol>
      <li><Link to="/face">Face</Link></li>
      <li><Link to="/orders">Orders</Link></li>
      <li><Link to="/marquee">Marquee</Link></li>
    </ol>
  }
}
