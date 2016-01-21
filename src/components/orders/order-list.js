import React, { PropTypes } from 'react'

import './index.css'

const Orders = ({children, className}) => {
  return <div className="OrderList">
    <div className="OrderList-row">
      <button className="OrderList-button">Dr. Pepper</button>
      <button className="OrderList-button">Coke</button>
      <button className="OrderList-button">Cherry Coke</button>
    </div>
    <div className="OrderList-row">
      <button className="OrderList-button">Mountain Dew</button>
      <button className="OrderList-button">Fresca</button>
      <button className="OrderList-button">Fanta</button>
    </div>
  </div>
}

Orders.propTypes = {
  className: PropTypes.string
}

export default Orders
