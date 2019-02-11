import React, { Component } from "react";
import "./DisplayCards.css";
import SingleCard from "../SingleCard/SingleCard";
const settings = window.require("electron-settings");

class DisplayCards extends Component {
  state = {
    newCards: settings.get("dataToRender.newCards") || []
  };
  render() {
    const { newCards } = this.state;
    console.log(newCards);
    return (
      <div className="DisplayCards">
        {newCards.map(card => {
          if (
            card === null ||
            !card.hasOwnProperty("image_uris") ||
            !card.hasOwnProperty("name") ||
            !card.hasOwnProperty("rarity") ||
            !card.hasOwnProperty("mana_cost")
          )
            return "";
          return (
            <SingleCard
              key={card.arena_id}
              name={card.name}
              image_uris={card.image_uris}
              mana_cost={card.mana_cost}
              rarity={card.rarity}
            />
          );
        })}
      </div>
    );
  }
}

export default DisplayCards;
