import React, { Component } from "react";
import "./SingleDeck.css";

class SingleDeck extends Component {
  render() {
    const { deck } = this.props;
    return (
      <div className="SingleDeck">
        <p>{deck.name}</p>
      </div>
    );
  }
}

export default SingleDeck;
