import React, { Component } from "react";

class CardData extends Component {
  render() {
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
                      src={`/static/manasymbols/${mana.toUpperCase()}.svg`}
                      alt={mana}
                    />
                  );
                })}
                <p className={`CardData__card__attr CardData__${card.rarity}`}>
                  {card.rarity}
                </p>
                <p className="CardData__card__attr">
                  {card.playerHas}/{card.quantity}
                </p>
                {card.playerHas !== card.quantity ? "| Incomplete" : ""}
              </div>
            );
          }
          return "";
        })}
        <style jsx>{`
          .CardData__card {
            display: flex;
          }

          .CardData__card__attr {
            margin: 0 1rem;
          }

          .CardData__card__mana {
            width: 1rem;
            height: 1rem;
          }

          .CardData__type {
            font-weight: bolder;
          }
        `}</style>
      </div>
    );
  }
}

export default CardData;
