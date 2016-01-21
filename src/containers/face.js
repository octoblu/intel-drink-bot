import React, { Component } from 'react'
import ClassNames from 'classnames'

var meshbluConfig = {
  "uuid": "cbb0ae28-965a-49bd-b6b0-a30a2eda5094",
  "token": "d1d83f51d97ebcf4825ebb7bbf8ef8d77fdcca51",
  "server": "meshblu.octoblu.com",
  "port": 443
}

var conn = meshblu.createConnection(meshbluConfig)


// var meshblu = new MeshbluWebsocket(meshbluConfig);
console.log(meshbluConfig)

class Face extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    face: false
  }

  componentDidMount() {
    var self = this
    conn.on('ready', function(data){
      self.setState({face: true})
    });

    conn.on('message', function(message){
      // self.setState({face: true})
    });
    // LISTEN a

  }
  render() {
    console.log(this.state);
    let componentClass = ClassNames( { 'face': this.state.face})
    return <div>
      <div className={componentClass}>{this.state.face}</div>
    </div>
  }
}

export default Face
