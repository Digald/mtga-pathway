import React, { Component } from "react";
import "./ScrapeButton.css";
const { ipcRenderer } = window.require("electron");

class ScrapeButton extends Component {
  state = {
    btnStatus: "default"
  };
  constructor() {
    super();
    ipcRenderer.on("grab-decks-response", (event, arg) => {
      if (arg === "done") {
        this.setState({
          btnStatus: "default"
        });
      }
    });
  }

  handleClick = () => {
    console.log("clicked");
    this.setState({
      btnStatus: "disabled"
    });
    ipcRenderer.send("grab-decks", "clicked");
  };

  render() {
    const { btnStatus } = this.state;
    if (btnStatus === "disabled") {
      return (
        <button className="ScrapeButton--disabled">
          This may take a moment...
        </button>
      );
    }
    return (
      <button className="ScrapeButton" onClick={e => this.handleClick()}>
        Search For New Decks
      </button>
    );
  }
}

export default ScrapeButton;
