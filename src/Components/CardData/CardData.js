import React, { Component } from "react";
import "./CardData.css";

class CardData extends Component {
  importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  render() {
    const images = this.importAll(
      require.context("../../assets/manasymbols", false, /\.(png|jpe?g|svg)$/)
    );
    console.log(images);
    console.log(this.props);
    const { card, type } = this.props;
    return (
      <div className="CardData">
        <p className="CardData__type">{type}</p>
        {card.map(card => {
          if (card.type === type) {
            return (
              <div key={card.name} className="CardData__card">
                <p className="CardData__card__attr">{card.name}</p>
                {card.mana_cost.map((mana, index) => {
                  return (
                    <img
                      key={index}
                      className="CardData__card__mana"
                      src={images[mana.toUpperCase() + ".svg"]}
                      alt={mana}
                    />
                  );
                })}
                <p className="CardData__card__attr">{card.rarity}</p>
                <p className="CardData__card__attr">x/{card.quantity}</p>
              </div>
            );
          }
          return "";
        })}
      </div>
    );
  }
}

export default CardData;
