import React, { Component } from "react";
// Components
import ScrapeButton from "./ScrapeButton";
import DeckGrid from "./DeckGrid";
import DeckFilter from "./DeckFilter";

class DeckFinderView extends Component {
  render() {
    return (
      <div className="DeckFinderView">
        <div className="DeckFinderView__container">
          <div className="DeckFinderView__container__btnContainer">
            <p className="DeckFinderView__container__btnContainer__text">
              Note: Searching for new decks will replace currently displayed decks. Be
              sure to save those that you want to refernce later.
            </p>
            <ScrapeButton />
          </div>
          <DeckFilter />
        </div>
        <DeckGrid fromPage="DeckFinderView" />
        <style jsx>{`
          .DeckFinderView {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto;
          }

          .DeckFinderView__container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            padding: 2rem;
          }

          .DeckFinderView__container__btnContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .DeckFinderView__container__btnContainer__text {
            text-align: center;
            padding: 5px;
          }
        `}</style>
      </div>
    );
  }
}

export default DeckFinderView;
