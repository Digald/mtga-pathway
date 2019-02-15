import React, { Component } from "react";
import "./DeckGrid.css";
import SingleDeck from "../SingleDeck/SingleDeck";
const settings = window.require("electron-settings");
const { ipcRenderer } = window.require("electron");

class DeckGrid extends Component {
  state = {
    decksList: settings.get("mtgaCardData.minedDecks") || [],
    savedDecks: settings.get("mtgaCardData.savedDecks") || []
  };
  constructor() {
    super();
    ipcRenderer.on("grab-decks-response", (event, arg) => {
      if (arg === "done") {
        this.setState({
          decksList: settings.get("mtgaCardData.minedDecks")
        });
      }
    });
  }
  render() {
    const { decksList, savedDecks } = this.state;
    const { fromPage } = this.props;
    let displayDecks;
    if (fromPage === "DeckFinderView") {
      displayDecks = decksList;
    } else if (fromPage === "DashboardView") {
      displayDecks = savedDecks;
    }
    return (
      <div className="DeckGrid">
        {displayDecks.map(deck => {
          return <SingleDeck />;
        })}
      </div>
    );
  }
}

export default DeckGrid;
