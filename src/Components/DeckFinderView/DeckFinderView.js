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
            <ScrapeButton />
          </div>
          <DeckFilter />
        </div>
        <DeckGrid />
      </div>
    );
  }
}

export default DeckFinderView;
