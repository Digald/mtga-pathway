import React, { Component } from "react";
import "./DeckListView.css";
const { ipcRenderer } = window.require("electron");

class DeckListView extends Component {
  state = {
    decklist: {}
  };

  constructor() {
    super();
    ipcRenderer.on("get-single-decklist", (event, arg) => {
      this.setState({
        decklist: arg
      });
    });
  }

  render() {
    console.log(this.state);
    return <div className="DeckListView">Sup my dood</div>;
  }
}

export default DeckListView;
