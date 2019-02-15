import React, { Component } from "react";
import "./DashboardView.css";
// Components
import DeckGrid from "../DeckGrid/DeckGrid";
import DisplayCards from "../DisplayCards/DisplayCards";

class DashboardView extends Component {
  render() {
    return (
      <div className="DashboardView">
        <div className="DashboardView__container">
          <h2 className="DashboardView__container__title">Saved Decks</h2>
          <DeckGrid fromPage="DashboardView"/>
        </div>
        <div className="DashboardView__container">
          <h2 className="DashboardView__container__title">
            Newly Added To Collection
          </h2>
          <DisplayCards />
        </div>
      </div>
    );
  }
}

export default DashboardView;
