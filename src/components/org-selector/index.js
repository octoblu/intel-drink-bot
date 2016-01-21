import './index.css'

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import enhanceWithClickOutside from 'react-click-outside'


import Button from '../button'
import OrgSelectorList from './org-selector-list'

class OrgSelector extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    show: false
  }

  handleClickOutside() {
    this.setState({ show: false });
  }

  handleSelection = (orgId) => {
    this.props.onSelection(orgId)
    this.setState({show: false})
  }

  handleToggleList = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    let {orgs, onSelection, selectedOrg} = this.props
    let selectedOrgId = selectedOrg.id

    return <div className="OrgSelector">
      <Button
        onClick={this.handleToggleList}
        kind="no-style"
        className="OrgSelector-label"
      >
        {selectedOrgId}
        <i className="zmdi zmdi-caret-down zmdi-hc-fw"></i>
      </Button>

      <OrgSelectorList
        orgs= {orgs}
        selectedOrg={selectedOrg}
        onSelection={this.handleSelection}
        show={this.state.show}
        />
    </div>
  }
}

OrgSelector.propTypes = {
  orgs: PropTypes.array.isRequired,
  onSelection: PropTypes.func.isRequired,
  selectedOrg: PropTypes.object.isRequired,
}

export default enhanceWithClickOutside(OrgSelector)
