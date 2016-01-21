import './index.css'

import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from '../button'

const OrgSelectorList = ({ orgs, onSelection, selectedOrg, show }) => {
  if (!show) return <span/>

  const selectedOrgId = selectedOrg.id
  const options = _.map(orgs, (org) => {
    let orgLabel = org.id
    if (selectedOrgId === org.id) orgLabel = <strong>{org.id}</strong>

    return <Button
      onClick={() => onSelection(org.id)}
      key={org.id}
      kind="no-style"
      className="OrgSelector-listItem"
      >
      {orgLabel}
    </Button>
  })

  return <div
    value={selectedOrgId}
    className="OrgSelector-list">
    {options}
  </div>
}

OrgSelectorList.propTypes = {
  orgs: PropTypes.array.isRequired,
  onSelection: PropTypes.func.isRequired,
  selectedOrg: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}

export default OrgSelectorList
