import { Component } from "react";

export default class extends Component {
  state = {};

  //   componentDidMount () {
  //     // start listening the channel message
  //     global.ipcRenderer.on('message', this.handleMessage)
  //   }

  //   componentWillUnmount () {
  //     // stop listening the channel message
  //     global.ipcRenderer.removeListener('message', this.handleMessage)
  //   }

  //   handleMessage = (event, message) => {
  //     // receive a message from the main process and save it in the local state
  //     this.setState({ message })
  //   }

  //   handleChange = event => {
  //     this.setState({ input: event.target.value })
  //   }

  //   handleSubmit = event => {
  //     event.preventDefault()
  //     global.ipcRenderer.send('message', this.state.input)
  //     this.setState({ message: null })
  //   }

  render() {
    return <div>This is home now</div>;
  }
}
