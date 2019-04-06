import React, { Component } from "react";
import "./DeckGrid.css";
import SingleDeck from "../SingleDeck/SingleDeck";
const settings = window.require("electron-settings");
const { ipcRenderer } = window.require("electron");

class DeckGrid extends Component {
  state = {
    decksList: settings.get("mtgaCardData.minedDecks") || [],
    savedDecks: settings.get("mtgaCardData.savedDecks") || [],
    filteredColors: [],
    restrictColors: false
  };
  constructor() {
    super();

    this.updateDeckList = this.updateDeckList.bind(this);
    ipcRenderer.on("grab-decks-response", this.updateDeckList);

    this.updatedSavedDecks = this.updatedSavedDecks.bind(this);
    ipcRenderer.on("delete-saved-deck", this.updatedSavedDecks);

    this.filterColors = this.filterColors.bind(this);
    ipcRenderer.on("get-filter-color", this.filterColors);

    this.restrictColors = this.restrictColors.bind(this);
    ipcRenderer.on("get-restrict-color", this.restrictColors);
  }

  updateDeckList = (event, arg) => {
    if (arg === "done") {
      this.setState({
        decksList: settings.get("mtgaCardData.minedDecks")
      });
    }
  };

  updatedSavedDecks = (event, arg) => {
    if (arg === "delete-saved-deck") {
      this.setState({ savedDecks: settings.get("mtgaCardData.savedDecks") });
    }
  };

  filterColors = (event, color) => {
    const { filteredColors } = this.state;
    console.log(filteredColors);
    if (filteredColors.indexOf(color) === -1) {
      filteredColors.push(color);
      this.setState({
        filteredColors
      });
      return;
    }
    const colorIndex = filteredColors.indexOf(color);
    filteredColors.splice(colorIndex, 1);
    this.setState({
      filteredColors
    });
    return;
  };

  restrictColors = (event, arg) => {
    if (arg !== "checked") {
      this.setState({
        restrictColors: false
      });
      return;
    }
    this.setState({
      restrictColors: true
    });
    return;
  };

  render() {
    const {
      decksList,
      savedDecks,
      filteredColors,
      restrictColors
    } = this.state;
    const { fromPage } = this.props;
    let displayDecks;
    if (fromPage === "DeckFinderView") {
      displayDecks = decksList;
    } else if (fromPage === "DashboardView") {
      displayDecks = savedDecks;
    }
    // Sorts all decks from highest to lowest percentages
    displayDecks = displayDecks.sort((a, b) => {
      return b.complete_W_Wildcards - a.complete_W_Wildcards;
    });
    console.log(displayDecks.complete_WO_Wildcards);
    return (
      <div className="DeckGrid">
        {displayDecks.map((deck, i) => {
          // Find decks that includes selected colors
          if (!restrictColors) {
            const toDisplay = filteredColors.map(mana => {
              if (deck.colors.indexOf(mana) !== -1) {
                return true;
              }
              return false;
            });
            if (toDisplay.includes(false)) {
              return "";
            }
            console.log(deck);
            return <SingleDeck key={i} fromPage={fromPage} deck={deck} />;
          }

          // Find decks that ONLY contain selected colors
          const toDisplay = filteredColors.map(mana => {
            if (
              deck.colors.indexOf(mana) !== -1 &&
              filteredColors.length === deck.colors.length
            ) {
              return true;
            }
            return false;
          });
          if (toDisplay.includes(false)) {
            return "";
          }
          return <SingleDeck key={i} fromPage={fromPage} deck={deck} />;
        })}
      </div>
    );
  }
}

export default DeckGrid;
