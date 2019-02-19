import React, { Component } from "react";
import "./SingleDeck.css";
import { Link } from "react-router-dom";
import B from "../../assets/manasymbols/B.svg";
import G from "../../assets/manasymbols/G.svg";
import W from "../../assets/manasymbols/W.svg";
import U from "../../assets/manasymbols/U.svg";
import R from "../../assets/manasymbols/R.svg";
const settings = window.require("electron-settings");

class SingleDeck extends Component {
  renderSymbols = color => {
    let displaySymbol;
    switch (color) {
      case "u":
        displaySymbol = U;
        break;
      case "w":
        displaySymbol = W;
        break;
      case "b":
        displaySymbol = B;
        break;
      case "g":
        displaySymbol = G;
        break;
      case "r":
        displaySymbol = R;
        break;
      default:
        break;
    }
    return displaySymbol;
  };

  saveDeck = () => {
    const { deck } = this.props;
    let savedDecks = settings.get("mtgaCardData.savedDecks");
    if (!savedDecks) {
      settings.set("mtgaCardData.savedDecks", []);
      savedDecks = settings.get("mtgaCardData.savedDecks");
    }
    savedDecks.push(deck);
    settings.set("mtgaCardData.savedDecks", savedDecks);
    console.log(settings.get("mtgaCardData.savedDecks"));
    console.log("deck saved");
  };

  render() {
    const { name, colors } = this.props.deck;
    const image = this.props.deck.deckList[0].image;
    const background = {
      backgroundImage: `url(${image})`
    };
    return (
      <div className="SingleDeck" style={background}>
        <Link className="SingleDeck__titlelink" to="#">
          <div className="SingleDeck__title">
            <p>{name}</p>
          </div>
        </Link>
        <div className="SingleDeck__header">
          <div className="SingleDeck__header__colors">
            {colors.map((color, i) => {
              return (
                <img
                  className="SingleDeck__header__symbol"
                  key={i}
                  src={this.renderSymbols(color)}
                  alt="color"
                />
              );
            })}
          </div>
          <button
            className="SingleDeck__header__save"
            onClick={() => this.saveDeck()}
          >
            SAVE
          </button>
        </div>
        <Link to="#">
          <div className="SingleDeck__background" />
        </Link>
        <div className="SingleDeck__percentages">
          <div className="SingleDeck__percentages__single">
            <p className="SingleDeck__percentages__single__percent">45%</p>
            <p className="SingleDeck__percentages__single__wildcard">
              W/Wildcards
            </p>
          </div>
          <div className="SingleDeck__percentages__single">
            <p className="SingleDeck__percentages__single__percent">45%</p>
            <p className="SingleDeck__percentages__single__wildcard">
              WO/Wildcards
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleDeck;
