import React, { Component } from 'react'
import ClassNames from 'classnames'
import _ from 'lodash'

var meshbluConfig = {
  "uuid": "cbb0ae28-965a-49bd-b6b0-a30a2eda5094",
  "token": "d1d83f51d97ebcf4825ebb7bbf8ef8d77fdcca51",
  "server": "meshblu.octoblu.com",
  "port": 443
}


var glitchWords = ['future', 'citrix', 'skynet', 'drink']
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

  reload ({action, text}, callback) {
    location.reload(true);
  }

  dance ({action, text}, callback) {
    var self = this;
    self.setState({action, glitch:false})
  }

  say({action, text}, callback) {
    var self = this
    self.setState({action, glitch:false})
    var utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = _.find(speechSynthesis.getVoices(), {name: 'Daniel'})
    utterance.onboundary = function(event) {
      text = event.utterance.text

      if(event.charIndex === 0) {
        return
      }

      var spoken = text.substring(0, event.charIndex)
      var rest = text.substring(event.charIndex, text.length)
      var nextWord = _.first( _.words( _.lowerCase(rest) ))

      if(_.includes(glitchWords, nextWord)) {
        utterance.onend = null
        speechSynthesis.cancel()
        self.glitchSay({action: action, text: nextWord}, function(){
          self.say({action, text:rest}, callback)
        });
      }
    }
    self.vocalize({action, text, utterance}, callback)
  }

  glitchSay(options, callback) {
    var action = options.action
    var self = this;
    self.setState({action, glitch:true})

    var text = _.fill(Array(3), options.text.substring(0,1)).join(' ')
    text += ' ' + options.text
    var voice = _.find(speechSynthesis.getVoices(), {name: 'Alex'})
    var utterance = new SpeechSynthesisUtterance(text)

    utterance.voice = voice
    utterance.pitch = 1.8
    utterance.rate = 1.7
    self.vocalize({action, text, utterance}, callback)
  }

  laugh(message) {
    var self = this
    self.setState({action: message.action})
  }

  wait(message) {
    var self = this
    self.setState({action: message.action})
  }

  vocalize({action, text, utterance}, callback) {
    var self = this;

    utterance.onend = utterance.onend = function() {
      self.setState({action: 'wait'})
      if(callback) callback()
    }
    speechSynthesis.speak(utterance)

  }

  render() {
    var classes = {face: true}
    classes[this.state.action] = true
    classes['glitch'] = this.state.glitch

    let componentClass = ClassNames(classes)
    return <div className={componentClass}>{this.state.face}</div>
  }
}

export default Face
