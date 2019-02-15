import React, { Component } from "react";
import "./DeckGrid.css";
const { ipcRenderer } = window.require("electron");
const settings = window.require("electron-settings");

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
          return (
            <div key={deck.url}>
              <p>{deck.name}</p>
              <p>{deck.url}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DeckGrid;
