import './index.css'

import React, { PropTypes } from 'react'
import { Fixed } from 'react-layout-pane'

import Button from '../button'
import OrgSelector from '../org-selector'

const TopBar = ({ onLogout, orgs, onOrgSelection, selectedOrg }) => {
  const {accountShortName,shortName} = selectedOrg

  return <Fixed className="TopBar">
    <OrgSelector
      orgs={orgs}
      selectedOrg={selectedOrg}
      onSelection={onOrgSelection}
    />

    <Button
      kind="no-style"
      onClick={onLogout}
      className="TopBar-action">
      Sign out
    </Button>
  </Fixed>
}

TopBar.propTypes = {
  orgs: PropTypes.array.isRequired,
  onOrgSelection: PropTypes.func.isRequired,
  selectedOrg: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default TopBar
