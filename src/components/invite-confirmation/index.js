import React, { PropTypes } from 'react'

import './index.css'
import Button from '../button'

const InviteConfirmation = ({ accountShortName, orgShortName, octobluUserEmail, handleInviteConfirmation }) => {
  return <div className="InviteConfirmation">
    <h2>You'be been invited to join the {accountShortName}/{orgShortName} organization</h2>
    <p>Would you like to accept the invite? Accepting the invite will link your Octoblu account {octobluUserEmail} with {accountShortName}/{orgShortName}?</p>
    <Button onClick={handleInviteConfirmation}>Yes</Button>
  </div>
}

InviteConfirmation.propTypes = {
  accountShortName: PropTypes.string.isRequired,
  orgShortName: PropTypes.string.isRequired,
  octobluUserEmail: PropTypes.string.isRequired,
  handleInviteConfirmation: PropTypes.func.isRequired
}

export default InviteConfirmation
