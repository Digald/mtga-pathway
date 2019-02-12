import React, { Component } from "react";
import "./ScrapeButton.css";
const { ipcRenderer } = window.require("electron");

class ScrapeButton extends Component {

  handleClick = () => {
    console.log('clicked');
    ipcRenderer.send("grab-decks", 'clicked');
  }

  render() {
    return (
      <button className="ScrapeButton" onClick={(e) => this.handleClick()}>
        Search For New Decks
      </button>
    );
  }
}

export default ScrapeButton;
