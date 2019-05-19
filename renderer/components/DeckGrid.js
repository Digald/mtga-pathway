import React, { Component } from "react";
// import SingleDeck from "./SingleDeck";

class DeckGrid extends Component {
  state = {
    decksList: global.esettings.get("mtgaCardData.minedDecks") || [],
    savedDecks: global.esettings.get("mtgaCardData.savedDecks") || [],
    filteredColors: [],
    restrictColors: false
  };

  componentDidMount() {
    global.ipcRenderer.on("grab-decks-response", this.updateDeckList);
    global.ipcRenderer.on("delete-saved-deck", this.updatedSavedDecks);
    global.ipcRenderer.on("get-filter-color", this.filterColors);
    global.ipcRenderer.on("get-restrict-color", this.restrictColors);
  }

  componentWillUnmount() {
    global.ipcRenderer.removeListener(
      "grab-decks-response",
      this.updateDeckList
    );
    global.ipcRenderer.removeListener(
      "delete-saved-deck",
      this.updatedSavedDecks
    );
    global.ipcRenderer.removeListener("get-filter-color", this.filterColors);
    global.ipcRenderer.removeListener(
      "get-restrict-color",
      this.restrictColors
    );
  }

  updateDeckList = (event, arg) => {
    if (arg === "done") {
      this.setState({
        decksList: global.esettings.get("mtgaCardData.minedDecks")
      });
    }
  };

  updatedSavedDecks = (event, arg) => {
    if (arg === "delete-saved-deck") {
      this.setState({
        savedDecks: global.esettings.get("mtgaCardData.savedDecks")
      });
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
      return b.complete_WO_Wildcards - a.complete_WO_Wildcards;
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
        <style jsx>{`
          .DeckGrid {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    );
  }
}

export default DeckGrid;
