import React, { Component } from "react";

class DeckPercentageBoxes extends Component {
  render() {
    const { deck } = this.props;
    return (
      <div className="DeckPercentageBoxes">
        <div className="DeckPercentageBoxes__single">
          <p className="DeckPercentageBoxes__single__percent">
            {deck.complete_WO_Wildcards}%
          </p>
          <p className="DeckPercentageBoxes__single__wildcard">WO/Wildcards</p>
        </div>
        <div className="DeckPercentageBoxes__single">
          <p className="DeckPercentageBoxes__single__percent">
            {deck.complete_W_Wildcards}%
          </p>
          <p className="DeckPercentageBoxes__single__wildcard">W/Wildcards</p>
        </div>
        <style jsx>{`
          .DeckPercentageBoxes {
            padding: 0 0.5rem;
            background-color: white;
            display: flex;
            justify-content: space-between;
          }

          .DeckPercentageBoxes__single {
            text-align: center;
          }

          .DeckPercentageBoxes__single__percent {
            font-size: 15px;
            font-weight: bold;
            color: #a74482;
          }

          .DeckPercentageBoxes__single__wildcard {
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }
}

export default DeckPercentageBoxes;
