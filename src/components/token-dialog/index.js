import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import './index.css'

import Alert from '../alert'
import ClipboardButton from '../clipboard-button'
import Dialog from '../dialog'
import FormInput from '../form/form-input'
import DraggableMeshbluJSON from '../draggable-meshblu-json'

import { MESHBLU_SERVER, MESHBLU_PORT } from '../../constants/meshblu'

class TokenDialog extends Component {
  constructor() {
    super()
    this.copyStatusAlert = null
  }

  state = { copied: null }

  handleCopySuccess = () => {
    this.setState({ copied: true })
  }

  handleCopyFailure = () => {
    this.setState({ copied: false })
  }

  getMeshbluJSON = () => {
    const { uuid, token } = this.props
    return {
      uuid,
      token,
      server: MESHBLU_SERVER,
      port: MESHBLU_PORT
    }
  }

  renderAlert() {
    const {copied} = this.state

    if (copied === true) {
      return <Alert type="success">Token Copied!</Alert>
    }
    else if (copied === false) {
      return (
        <Alert type="failure">
          Highlight and copy the token to your clipboard
        </Alert>
      )
    }

    return null
  }

  render() {
    return <Dialog title="Device Token" onDismiss={this.props.onDismiss}>
      {this.renderAlert()}
      <div className="TokenDialog-body">
        <FormInput defaultValue={this.props.token} readOnly/>
        <ClipboardButton onSuccess={this.handleCopySuccess} onFailure={this.handleCopyFailure} text={this.props.token}/>
      </div>
      <div className="TokenDialog-meshbluButton">
        <DraggableMeshbluJSON meshbluJSON={this.getMeshbluJSON()} size="small"></DraggableMeshbluJSON>
      </div>
    </Dialog>
  }
}

TokenDialog.propTypes = {
  onDismiss: PropTypes.func,
  uuid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}

export default TokenDialog
