import React, { Component } from "react";
import "./DashboardView.css";
// Components
import DeckGrid from "../DeckGrid/DeckGrid";

class DashboardView extends Component {
  render() {
    return (
      <div className="DashboardView">
        <h2 className="DashboardView__title">Saved Decks</h2>
        <DeckGrid />
        <h2 className="DashboardView__title">Newly Added To Collection</h2>
        <div />
      </div>
    );
  }
}

export default DashboardView;
