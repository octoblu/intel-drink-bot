import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import classNames from 'classnames'

import './index.css'

import Button from '../button'

class DraggableMeshbluJSON extends Component {
  static propTypes = {
    meshbluJSON: PropTypes.object
  }

  componentDidMount() {
    const { meshbluJSON } = this.props
    let element = ReactDom.findDOMNode(this.refs.draggableMeshbluJSON)

    let meshbluJSONString = JSON.stringify(meshbluJSON);

    element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData("text/plain", meshbluJSONString)
    })
  }

  render() {
    const componentClass = classNames('DraggableMeshbluJSON', this.props.className)
    return <Button ref="draggableMeshbluJSON" className={this.componentClass} draggable="true" kind="hollow-neutral">DRAG ME TO GATEBLU</Button>
  }
}

export default DraggableMeshbluJSON
