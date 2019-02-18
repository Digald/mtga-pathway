import React, { Component } from "react";
import "./SingleDeck.css";

class SingleDeck extends Component {
  render() {
    const { name, colors } = this.props.deck;
    const image = this.props.deck.deckList[0].image;
    return (
      <div className="SingleDeck">
        <div className="SingleDeck__header">
          <p>{name}</p>
          <div className="SingleDeck__header__colors">
            {colors.map(color => {
              return <p>{color}</p>;
            })}
          </div>
        </div>
        <img className="SingleDeck__background" src={image} alt="Preview" />
        <div className="SingleDeck__percentages" />
      </div>
    );
  }
}

export default SingleDeck;
