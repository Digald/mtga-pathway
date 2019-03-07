import React, { Component } from "react";
import "./SingleDeck.css";
import { Link } from "react-router-dom";
import SaveDeleteDecksBtn from "../SaveDeleteDecksBtn/SaveDeleteDecksBtn";
import DeckPercentageBoxes from "../DeckPercentageBoxes/DeckPercentageBoxes";
import B from "../../assets/manasymbols/B.svg";
import G from "../../assets/manasymbols/G.svg";
import W from "../../assets/manasymbols/W.svg";
import U from "../../assets/manasymbols/U.svg";
import R from "../../assets/manasymbols/R.svg";
const settings = window.require("electron-settings");
const { ipcRenderer } = window.require("electron");

class SingleDeck extends Component {
  state = {
    buttonText: "SAVE"
  };
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

  componentDidMount() {
    ipcRenderer.send('match-cards', this.props.deck);
    console.log(this.props.deck);
  }

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
    const result = savedDecks.find(element => {
      return element.url === deck.url;
    });
    if (!result) {
      savedDecks.push(deck);
    }
    settings.set("mtgaCardData.savedDecks", savedDecks);
    this.setState({
      buttonText: "ADDED"
    });
  };

  checkClick = () => {
    settings.set("dataToRender.decklist", this.props.deck);
  };

  render() {
    const { buttonText } = this.state;
    const { fromPage } = this.props;
    let Button;
    if (fromPage === "DashboardView") {
      Button = (
        <SaveDeleteDecksBtn text="DELETE" clickEvent={this.deleteDeck} />
      );
    } else if (fromPage === "DeckFinderView") {
      Button = (
        <SaveDeleteDecksBtn text={buttonText} clickEvent={this.saveDeck} />
      );
    }
    const { name, colors } = this.props.deck;
    const image = this.props.deck.deckList[0].image;
    const background = {
      backgroundImage: `url(${image})`
    };
    return (
      <div className="SingleDeck" style={background}>
        <Link
          className="SingleDeck__titlelink"
          to="/decklist"
          onClick={() => this.checkClick()}
        >
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
        <Link to="/decklist" onClick={() => this.checkClick()}>
          <div className="SingleDeck__background" />
        </Link>
        <DeckPercentageBoxes />
      </div>
    );
  }
}

export default SingleDeck;
