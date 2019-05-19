import React, { Component } from "react";
// Components
import DeckGrid from "./DeckGrid";
// import DisplayCards from "./DisplayCards";

class DashboardView extends Component {
  render() {
    return (
      <div className="DashboardView">
        <div className="DashboardView__container">
          <h2 className="DashboardView__container__title">Saved Decks</h2>
          <DeckGrid fromPage="DashboardView" />
        </div>
        <div className="DashboardView__container">
          <h2 className="DashboardView__container__title">
            Newly Added To Collection
          </h2>
          <DisplayCards />
        </div>
        <style jsx>{`
          .DashboardView {
            grid-area: 2 / 2 / 3 / 3;
            padding: 5%;
          }

          .DashboardView__container {
            border-bottom: 1px solid black;
          }

          .DashboardView__container:last-child {
            border-bottom: none;
          }

          .DashboardView__container__title {
            font-weight: 100;
            margin: 0 0 20px 0;
          }
        `}</style>
      </div>
    );
  }
}

export default DashboardView;
