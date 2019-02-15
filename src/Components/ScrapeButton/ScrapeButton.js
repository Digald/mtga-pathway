import React, { Component } from "react";
import "./ScrapeButton.css";
const { ipcRenderer } = window.require("electron");
const settings = window.require("electron-settings");

class ScrapeButton extends Component {
  constructor() {
    super();
    ipcRenderer.on("grab-decks-response", (event, arg) => {
      console.log(arg);
    });

  }

  componentDidUpdate() {
    console.log("updated!");
  }

  handleClick = () => {
    console.log("clicked");
    ipcRenderer.send("grab-decks", "clicked");
  };

  render() {
    return (
      <button className="ScrapeButton" onClick={e => this.handleClick()}>
        Search For New Decks
      </button>
    );
  }
}

export default ScrapeButton;
