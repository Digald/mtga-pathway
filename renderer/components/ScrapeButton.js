import React, { Component } from "react";

class ScrapeButton extends Component {
  state = {
    btnStatus: "default"
  };

  componentDidMount() {
    global.ipcRenderer.on("grab-decks-response", this.decksRecieved);
  }

  componentWillUnmount() {
    global.ipcRenderer.removeListener(
      "grab-decks-response",
      this.decksRecieved
    );
  }

  decksRecieved = (event, arg) => {
    this.setState({
      btnStatus: "default"
    });
  };

  handleClick = () => {
    console.log("clicked");
    this.setState({
      btnStatus: "disabled"
    });
    global.ipcRenderer.send("grab-decks", "clicked");
  };

  render() {
    const { btnStatus } = this.state;
    if (btnStatus === "disabled") {
      return (
        <p className="ScrapeButton-disabled">
          This may take a good minute. Please do not close the application.
        </p>
      );
    }
    return (
      <button className="ScrapeButton" onClick={e => this.handleClick()}>
        Search For New Decks
        <style jsx>{`
          .ScrapeButton-disabled {
            border: 2px solid black;
            background-color: #ff3562;
            color: white;
            border: none;
            padding: 20px;
            margin: 0;
            box-shadow: inset 1px 1px 10px 5px rgba(0, 0, 0, 0.5);
          }
          .ScrapeButton {
            background-color: #ff3562;
            color: white;
            border: none;
            padding: 20px;
            margin: 0;
            box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.5);
          }

          .ScrapeButton:active {
            box-shadow: inset 1px 1px 10px 5px rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </button>
    );
  }
}

export default ScrapeButton;
