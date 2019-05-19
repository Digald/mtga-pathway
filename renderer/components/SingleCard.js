import React, { Component } from "react";

class SingleCard extends Component {
  render() {
    const { name, mana_cost, rarity, image_uris } = this.props;
    return (
      <div className="SingleCard">
        <p className="SingleCard__title">{name}</p>
        <img
          className="SingleCard__image"
          src={image_uris.normal}
          alt={`Rarity:${rarity}, Mana Cost:${mana_cost}`}
        />
        <style jsx>{`
          .SingleCard {
            margin-bottom: 10px;
          }

          .SingleCard__title {
            margin: 0;
          }

          .SingleCard__image {
            height: auto;
            width: 200px;
          }
        `}</style>
      </div>
    );
  }
}

export default SingleCard;
