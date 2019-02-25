import React, { Component } from "react";
import "./DeckPercentageBoxes.css";

class DeckPercentageBoxes extends Component {
  render() {
    return (
      <div className="DeckPercentageBoxes">
        <div className="DeckPercentageBoxes__single">
          <p className="DeckPercentageBoxes__single__percent">45%</p>
          <p className="DeckPercentageBoxes__single__wildcard">
            W/Wildcards
          </p>
        </div>
        <div className="DeckPercentageBoxes__single">
          <p className="DeckPercentageBoxes__single__percent">45%</p>
          <p className="DeckPercentageBoxes__single__wildcard">
            WO/Wildcards
          </p>
        </div>
      </div>
    );
  }
}

export default DeckPercentageBoxes;
