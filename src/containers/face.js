import React, { Component } from 'react'
import ClassNames from 'classnames'
import _ from 'lodash'
import async from 'async'
import querystring from 'querystring'
import meshblu from 'imports!../../lib/meshblu.js'

console.log('meshblu', meshblu)

var meshbluConfig = {
  "uuid": "cbb0ae28-965a-49bd-b6b0-a30a2eda5094",
  "token": "d1d83f51d97ebcf4825ebb7bbf8ef8d77fdcca51",
  "server": "meshblu.octoblu.com",
  "port": 443
}

var localMeshbluConfig = {
  "uuid": "5285ddf7-5250-4f92-ae0a-b783e4fda87b",
  "token": "1e7387b9bcb14b9606d4fe6e077d7f886323b9c6",
  "server": "edison.local",
  "port": 3040
}


var glitchWords = ['future', 'citrix', 'skynet', 'drink', 'treat', 'beverage', 'drink', 'candy', 'intel', 'octo-blu', 'go', 'coming right up!']
class Face extends Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'dispense',
      'randomlyGlitch',
      'glitch',
      'unGlitch',
      'reload',
      'dance',
      'getPhrases',
      'say',
      'getGlitchText',
      'laugh',
      'wait',
      'vocalize',
      'requestFullscreen',
      'render',
      'processMessage',
      'processPhrase'
    ])
  }

  state = {
    face: true,
    action: 'wait'
  }

  componentDidMount() {
    var query = querystring.parse(location.search.substring(1, location.search.length))
    _.each(localMeshbluConfig, function(value, key){
      if(query[key]) {
        console.log('setting local meshbluconfig', key, 'to', query[key])
        localMeshbluConfig[key] = query[key]
      }
    })

    this.randomlyGlitch()

    speechSynthesis.onvoiceschanged = function(){
      this.normalVoice = _.find(speechSynthesis.getVoices(), {name: 'Daniel'})
      this.glitchVoice = _.find(speechSynthesis.getVoices(), {name: 'Alex'})
    }

    var conn = meshblu.createConnection(meshbluConfig)
    var localCon = meshblu.createConnection(localMeshbluConfig)
    conn.on('message', this.processMessage)
    localCon.on('message', this.processMessage)

  }

  processMessage(message) {
    console.log('message',message)

    if(message.payload && !message.action) {
      message.action = message.payload
    }

    if(this[message.action]) {
      this[message.action](message)
    }
  }

  dispense(message) {
    var dispenseMessages = ['here you go', 'now dispensing', 'Do you want a treat, sir or madam?', "It's all yours!", 'Coming right up!']
    this.say({action: 'say', text: _.sample(dispenseMessages)})
  }

  randomlyGlitch() {
    var face = this
    setInterval(function(){
      if(Math.random() > 0.01) {
        face.glitch()
        setTimeout(function(){
          face.unGlitch()
        }, 5000);
      }
    }, 5000)
  }

  glitch() {
    this.setState({glitch: true})
  }

  unGlitch() {
    this.setState({glitch: false})
  }

  reload ({action, text}, callback) {
    location.reload(true);
  }

  dance ({action, text}, callback) {
    this.setState({action, glitch:false})
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
    var face = this
    console.log('saying', text)
    var phrases = this.getPhrases(text)
    async.eachSeries(phrases, this.processPhrase, function(){
      face.setState({action: 'wait', glitch: false, text: undefined})
    })
  }

  processPhrase(phrase, callback) {
    console.log('processPhrase', phrase)
    if(_.isEmpty(phrase.text)){
      this.setState({action: 'wait', glitch:false, text: false})
      return callback()
    }
    this.setState({action: 'say', glitch:false, text: phrase.text})

    var utterance = new SpeechSynthesisUtterance(phrase.text)
    utterance.voice = this.normalVoice

    if(phrase.voice === 'glitch') {
      this.setState({glitch:true})
      phrase.text = this.getGlitchText(phrase.text)
      utterance = new SpeechSynthesisUtterance(phrase.text)
      utterance.voice = this.glitchVoice

      utterance.pitch = 1.7
      utterance.rate = 2.0
    }

    utterance.onend = function(){
      console.log('ended')
      callback()
    }
    utterance.onerror = utterance.onerror = utterance.onend

    speechSynthesis.speak(utterance)

  }

  getGlitchText(text) {
    var glitchText = _.fill(Array(3), text.substring(0,2)).join(' ')
    glitchText += _.fill(Array(2), text.substring(0,3)).join(' ')
    glitchText += _.fill(Array(2), text).join(' ')
    console.log('glitchText', glitchText)

    return glitchText
  }

  laugh(message) {
    this.setState({action: message.action})
  }

  wait(message) {
    this.setState({action: message.action})
  }

  vocalize({action, text, utterance}, callback) {
    utterance.onend = utterance.onend = function() {
      this.setState({action: 'wait'})
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
    var classes = {face: true}
    classes[this.state.action] = true
    classes['glitch'] = this.state.glitch
    classes['normal'] = !this.state.glitch

    let componentClass = ClassNames(classes)
    return <div onClick={this.requestFullscreen} id="face">
       <div className={componentClass}></div>
       <h3>{this.state.text}</h3>
    </div>
  }
}

export default Face
