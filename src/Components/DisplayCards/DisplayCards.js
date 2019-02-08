import React, { Component } from "react";
import "./DisplayCards.css";
const settings = window.require("electron-settings");

class DisplayCards extends Component {
  state = {
    newCards: settings.get("renderUpdates.newCards") || null,
    newQuantities: settings.get("renderUpdates.newQuantities") || null
  };
  render() {
    console.log(this.state.newQuantities);
    console.log(this.state.newCards);
    const { newCards, newQuantities } = this.state;
    return (
      <div className="DisplayCards">
        {newCards.map(card => {
          return (
            <div key="arena_id">
              <img src={card.image_uris.art_crop} alt="sup" />
              <p>{card.name}</p>
              <p>{card.rarity}</p>
              <p>{card.mana_cost}</p>
            </div>
          );
        })}
        {newQuantities.map(card => {
          return (
            <div key="arena_id">
              <img src={card.image_uris.art_crop} alt="sup" />
              <p>{card.name}</p>
              <p>{card.rarity}</p>
              <p>{card.mana_cost}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayCards;
