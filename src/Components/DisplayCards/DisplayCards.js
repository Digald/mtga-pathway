import React, { Component } from "react";
import "./DisplayCards.css";
import SingleCard from "../SingleCard/SingleCard";
const settings = window.require("electron-settings");

class DisplayCards extends Component {
  state = {
    newCards: settings.get("renderUpdates.newCards") || [],
    newQuantities: settings.get("renderUpdates.newQuantities") || []
  };
  render() {
    const { newCards, newQuantities } = this.state;
    console.log(newCards);
    console.log(newQuantities);
    return (
      <div className="DisplayCards">
        {newCards.map(card => {
          if (
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
        {newQuantities &&
          newQuantities.map(card => {
            if (
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
