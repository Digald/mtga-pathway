import React, { Component } from "react";
import "./CardData.css";

class CardData extends Component {
  render() {
    const { name, rarity, quanitty } = this.props.card;
    return (
      <div className="CardData">
        <p>{name}</p>
        <p>mana cost</p>
        <p>{rarity}</p>
        <p>{quanitty}</p>
      </div>
    );
  }
}

export default CardData;
