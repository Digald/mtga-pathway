import { Component } from 'react'

// Delete start.js when ready for building and distributing
export default class extends Component {
  state = {
    input: '',
    message: null
  }

  componentDidMount () {
    // start listening the channel message
    global.ipcRenderer.on('message', this.handleMessage)
  }

  componentWillUnmount () {
    // stop listening the channel message
    global.ipcRenderer.removeListener('message', this.handleMessage)
  }

  handleMessage = (event, message) => {
    // receive a message from the main process and save it in the local state
    this.setState({ message })
  }

  handleChange = event => {
    this.setState({ input: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    global.ipcRenderer.send('message', this.state.input)
    this.setState({ message: null })
  }

  render () {
    return (
      <div>
        <h1>Hello Electron!</h1>
        <img src='/static/manasymbols/UB.svg' alt="static test"/>
        {this.state.message && <p>{this.state.message}</p>}

        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} />
        </form>

        <style jsx>{`
          h1 {
            color: red;
            font-size: 50px;
          }
        `}</style>
      </div>
    )
  }
}