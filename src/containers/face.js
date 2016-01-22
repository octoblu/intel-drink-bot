import React, { Component } from 'react'
import ClassNames from 'classnames'
import _ from 'lodash'

var meshbluConfig = {
  "uuid": "cbb0ae28-965a-49bd-b6b0-a30a2eda5094",
  "token": "d1d83f51d97ebcf4825ebb7bbf8ef8d77fdcca51",
  "server": "meshblu.octoblu.com",
  "port": 443
}


function vocalize(text, callback){
  var voice = _.findWhere(speechSynthesis.getVoices(), {name: 'Daniel'})
  var utterance = new SpeechSynthesisUtterance(text)
  utterance.voice = voice
  utterance.onend = callback
  speechSynthesis.speak(utterance)
}

class Face extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    face: true
  }

  componentDidMount() {
    var self = this
    var conn = meshblu.createConnection(meshbluConfig)

    conn.on('message', function(message){
      if(self[message.action]) {
        self[message.action](message)
      }
    })
  }

  say(message) {
    var self = this
    self.setState({action: message.action})
    vocalize(message.text, function(){
      self.setState({action: 'wait'})
    })
  }

  laugh(message) {
    var self = this
    self.setState({action: message.action})    
  }

  render() {
    var classes = {face: true}
    classes[this.state.action] = true

    let componentClass = ClassNames(classes)
    console.log(componentClass)
    return <div>
      <div className={componentClass}>{this.state.face}</div>
    </div>
  }
}

export default Face
