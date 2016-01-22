import React, { Component } from 'react'

import Loading from '../components/loading'

import '../styles/base.css'

export default class Layout extends Component {
  render() {
    return <div className="main">
      {this.props.children}
    </div>
  }
}
