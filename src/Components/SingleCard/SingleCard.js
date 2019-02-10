import React, { Component } from "react";
import "./SingleCard.css";

class SingleCard extends Component {
  render() {
    const { name, mana_cost, rarity, image_uris } = this.props;
    return (
      <div className="SingleCard">
        <p className="SingleCard__title">{name}</p>
        <img className="SingleCard__image"
          src={image_uris.normal}
          alt={`Rarity:${rarity} Mana Cost:${mana_cost}`}
        />
      </div>
    );
  }
}

export default SingleCard;
