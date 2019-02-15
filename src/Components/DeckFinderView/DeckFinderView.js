import React, { Component } from "react";
import "./DeckFinderView.css";
// Components
import ScrapeButton from "../ScrapeButton/ScrapeButton";
import DeckGrid from "../DeckGrid/DeckGrid";
import DeckFilter from "../DeckFilter/DeckFilter";

class DeckFinderView extends Component {
  render() {
    return (
      <div className="DeckFinderView">
        <div className="DeckFinderView__container">
          <div className="DeckFinderView__container__btnContainer">
            <p className="DeckFinderView__container__btnContainer__text">
              Searching for new decks will replace currently displayed decks. Be
              sure to save those that you want to refernce later.
            </p>
            <ScrapeButton />
          </div>
          <DeckFilter />
        </div>
        <DeckGrid fromPage="DeckFinderView" />
      </div>
    );
  }
}

export default DeckFinderView;
