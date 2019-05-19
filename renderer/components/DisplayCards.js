import React, { Component } from "react";
// import SingleCard from "./SingleCard";

class DisplayCards extends Component {
  state = {
    newCards: global.esettings.get("dataToRender.newCards") || []
  };
  render() {
    const { newCards } = this.state;
    console.log(newCards);
    return (
      <div className="DisplayCards">
        {newCards.map(card => {
          if (
            card === null ||
            !card.hasOwnProperty("name") ||
            !card.hasOwnProperty("rarity") ||
            !card.hasOwnProperty("mana_cost")
          ) {
            return "";
          } else if (!card.hasOwnProperty("image_uris")) {
            return (
              <SingleCard
                key={card.arena_id}
                name={card.name}
                image_uris="#"
                mana_cost={card.mana_cost}
                rarity={card.rarity}
              />
            );
          }
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
        <style jsx>{`
          .DisplayCards {
            max-width: 100%;
            display: flex;
            flex-wrap: wrap;
          }
        `}</style>
      </div>
    );
  }
}

export default DisplayCards;
