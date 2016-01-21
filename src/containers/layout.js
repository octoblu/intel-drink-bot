import React, { Component } from 'react'

import Loading from '../components/loading'

import '../styles/base.css'

export default class Layout extends Component {
  render() {
    return <div>
      <h1>Intel Robot Hub</h1>

      <div>{this.props.children}</div>
    </div>
  }
}
