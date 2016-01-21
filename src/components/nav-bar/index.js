import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Fixed } from 'react-layout-pane'

import './index.css'

const NavBar = ({ selectedOrgId }) => {
  return (
    <Fixed className="NavBar">
      <nav className="NavBar-nav">
        <Link
          to={`/${selectedOrgId}/members`}
          activeClassName="NavBar-action--active"
          className="NavBar-action">
          Members
        </Link>
        <Link
          to={`/${selectedOrgId}/devices`}
          activeClassName="NavBar-action--active"
          className="NavBar-action">
          Devices
        </Link>
      </nav>
    </Fixed>
  )
}

NavBar.propTypes = {
  selectedOrgId: PropTypes.string.isRequired,
}

export default NavBar
