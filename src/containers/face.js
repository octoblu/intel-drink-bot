import React, { Component } from 'react'
import ClassNames from 'classnames'
import _ from 'lodash'
import async from 'async'

var meshbluConfig = {
  "uuid": "cbb0ae28-965a-49bd-b6b0-a30a2eda5094",
  "token": "d1d83f51d97ebcf4825ebb7bbf8ef8d77fdcca51",
  "server": "meshblu.octoblu.com",
  "port": 443
}


var glitchWords = ['future', 'citrix', 'skynet', 'drink', 'treat']
class Face extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    face: true,
    action: 'wait'
  }

  componentDidMount() {
    var self = this
    self.randomlyGlitch()

    speechSynthesis.onvoiceschanged = function(){
      self.normalVoice = _.find(speechSynthesis.getVoices(), {name: 'Daniel'})
      self.glitchVoice = _.find(speechSynthesis.getVoices(), {name: 'Alex'})
    }


    var conn = meshblu.createConnection(meshbluConfig)
    conn.on('message', function(message){
      console.log('message',message)
      if(self[message.action]) {
        self[message.action](message)
      }
    })

  }

  randomlyGlitch() {
    var self = this
    setInterval(function(){
      if(Math.random() > 0.01) {
        self.glitch()
        setTimeout(function(){
          self.unGlitch()
        }, 5000);
      }
    }, 5000)
  }

  glitch() {
    var self = this;
    self.setState({glitch: true})
  }

  unGlitch() {
    var self = this;
    self.setState({glitch: false})
  }

  reload ({action, text}, callback) {
    location.reload(true);
  }

  dance ({action, text}, callback) {
    var self = this;
    self.setState({action, glitch:false})
  }

  getPhrases(text) {
    var phrases = []
    var phrase = { words: [], voice: 'normal' }

    phrases.push(phrase)

    _.each( _.words(text), function(word){
      if(_.includes(glitchWords, word)){
        phrase.text = phrase.words.join(' ')
        phrases.push({ voice: 'glitch', text: word, words: [word] })
        phrase = {words: [], voice: 'normal'}
        phrases.push(phrase)
        return
      }
      phrase.words.push(word)
    })

    phrase.text = phrase.words.join(' ')
    console.log('phrases', phrases);
    return phrases

  }

  say({action, text}, callback) {
    var self = this
    var phrases = self.getPhrases(text)
    self.setState({action, glitch:false})
    async.eachSeries(phrases, function iterator(phrase, callback) {
      console.log('processing phrase', phrase)
      if(_.isEmpty(phrase.text)){
        return callback()
      }

      self.setState({action, glitch:false})

      var utterance = new SpeechSynthesisUtterance(phrase.text)
      utterance.voice = self.normalVoice

      if(phrase.voice === 'glitch') {
        self.setState({action, glitch:true})
        phrase.text = self.getGlitchText(phrase.text)
        utterance = new SpeechSynthesisUtterance(phrase.text)
        utterance.voice = self.glitchVoice

        utterance.pitch = 1.7
        utterance.rate = 2.0
      }

      utterance.onend = function(){ callback() }
      utterance.onerror = function(error) { callback(error) }

      speechSynthesis.speak(utterance)

    }, function(){
      self.setState({action: 'wait', glitch: 'false'})
    })
  }

  getGlitchText(text) {
    var glitchText = _.fill(Array(3), text.substring(0,2)).join(' ')
    glitchText += _.fill(Array(2), text.substring(0,3)).join(' ')
    glitchText += _.fill(Array(3), text).join(' ')
    console.log('glitchText', glitchText)

    return glitchText
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

  requestFullscreen() {
    var elem = document.getElementById("face")
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  render() {
    var self = this;
    var classes = {face: true}
    classes[this.state.action] = true
    classes['glitch'] = this.state.glitch
    classes['normal'] = !this.state.glitch

    let componentClass = ClassNames(classes)
    return <div onClick={self.requestFullscreen} id="face" className={componentClass}>{this.state.face}</div>
  }
}

export default Face
