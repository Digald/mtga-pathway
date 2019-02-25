import React, { Component } from "react";
import "./SingleDeck.css";
import { Link } from "react-router-dom";
import SaveDeleteDecksBtn from "../SaveDeleteDecksBtn/SaveDeleteDecksBtn";
import B from "../../assets/manasymbols/B.svg";
import G from "../../assets/manasymbols/G.svg";
import W from "../../assets/manasymbols/W.svg";
import U from "../../assets/manasymbols/U.svg";
import R from "../../assets/manasymbols/R.svg";
const settings = window.require("electron-settings");
const { ipcRenderer } = window.require("electron");

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

  deleteDeck = () => {
    const { url } = this.props.deck;
    const savedDecks = settings.get("mtgaCardData.savedDecks");
    savedDecks.forEach((element, i) => {
      if (element.url === url) {
        savedDecks.splice(i, 1);
      }
      return;
    });
    settings.set("mtgaCardData.savedDecks", savedDecks);
    ipcRenderer.send("delete-saved-deck", "delete-saved-deck");
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
  };

  render() {
    const { fromPage, deck } = this.props;
    let Button;
    if (fromPage === "DashboardView") {
      Button = (
        <SaveDeleteDecksBtn text="DELETE" clickEvent={this.deleteDeck} />
      );
    } else if (fromPage === "DeckFinderView") {
      Button = <SaveDeleteDecksBtn text="SAVE" clickEvent={this.saveDeck} />;
    }
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
          {Button}
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
