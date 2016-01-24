import React, { Component } from 'react'

import Loading from '../components/loading'
import OrderList from '../components/orders/order-list'
import ClassNames from 'classnames'

export default class Marquee extends Component {
  constructor(props) {
    super(props)
      _.bindAll(this, [
        'render',
        'setText',
        'toggleEdit'
      ])
  }
  state = {
    text: 'loading'
  }

  componentDidMount() {
    this.setState({text: '', showEdit: true})
  }

  render() {
    let inputClasses = ClassNames({hide: !this.state.showEdit})

    return <div id="marquee">
        <header className="toolbar">
          <input className={inputClasses} onChange={this.setText} value={this.state.text}/>
        </header>
        <marquee onClick={this.toggleEdit}>{this.state.text || 'Click Me to Edit'}</marquee>
      </div>
  }

  setText(event) {
    this.setState({text: event.target.value})
  }

  toggleEdit(event) {
    event.preventDefault()
    this.setState({showEdit: !this.state.showEdit})
    console.log('showEdit', this.state.showEdit)
  }

}
