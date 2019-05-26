import React, { Component } from "react";
import Link from "next/link";
import SaveDeleteDecksBtn from "./SaveDeleteDecksBtn";
import DeckPercentageBoxes from "./DeckPercentageBoxes";

class SingleDeck extends Component {
  state = {
    buttonText: "SAVE"
  };

  componentDidMount() {}

  renderSymbols = color => {
    let displaySymbol;
    switch (color) {
      case "u":
        displaySymbol = "/static/manasymbols/U.svg";
        break;
      case "w":
        displaySymbol = "/static/manasymbols/W.svg";
        break;
      case "b":
        displaySymbol = "/static/manasymbols/B.svg";
        break;
      case "g":
        displaySymbol = "/static/manasymbols/G.svg";
        break;
      case "r":
        displaySymbol = "/static/manasymbols/R.svg";
        break;
      default:
        break;
    }
    return displaySymbol;
  };

  deleteDeck = () => {
    const { url } = this.props.deck;
    const savedDecks = global.ipcRenderer.sendSync("get-savedDecks");
    savedDecks.forEach((element, i) => {
      if (element.url === url) {
        savedDecks.splice(i, 1);
      }
      return;
    });
    global.ipcRenderer.send("set-savedDecks", savedDecks);
    global.ipcRenderer.send("delete-saved-deck", "delete-saved-deck");
  };

  saveDeck = () => {
    const { deck } = this.props;
    let savedDecks = global.ipcRenderer.sendSync("get-savedDecks");
    if (!savedDecks) {
      global.ipcRenderer.send("set-savedDecks", []);
      savedDecks = global.ipcRenderer.sendSync("get-savedDecks");
    }
    const result = savedDecks.find(element => {
      return element.url === deck.url;
    });
    if (!result) {
      savedDecks.push(deck);
    }
    global.ipcRenderer.send("set-savedDecks", savedDecks);
    this.setState({
      buttonText: "ADDED"
    });
  };

  checkClick = () => {
    global.ipcRenderer.sendSync("set-decklist-SingleDeck", this.props.deck);
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
          href="/decklist"
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
        <Link href="/decklist" onClick={() => this.checkClick()}>
          <div className="SingleDeck__background" />
        </Link>
        <DeckPercentageBoxes deck={this.props.deck} />
        <style jsx>{`
          .SingleDeck {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto auto auto;
            border: 1px solid #1b1b3a;
            margin: 0.5rem;
            background-repeat: no-repeat;
            background-position: -12px 52px;
            box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.4);
            width: 200px;
            color: #693668;
            max-height: 303px;
          }

          .SingleDeck__titlelink {
            text-decoration: none;
            padding: 0;
            margin: 0;
            background-color: white;
          }

          .SingleDeck__title {
            display: flex;
            justify-content: center;
            padding: 0 0.5rem;
            background-color: white;
            font-weight: bold;
            color: #a74482;
          }

          .SingleDeck__title p {
            flex-shrink: 0.5;
          }

          .SingleDeck__header {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 0 0 0 0.5rem;
          }

          .SingleDeck__header__symbol {
            height: 1rem;
          }

          .SingleDeck__header__save {
            width: 100px;
            height: 2rem;
            background-color: #1b1b3a;
            color: white;
            border: none;
          }

          .SingleDeck__background {
            height: 140px;
            width: 100%;
          }

          .SingleDeck__percentages {
            padding: 0 0.5rem;
            background-color: white;
            display: flex;
            justify-content: space-between;
          }

          .SingleDeck__percentages__single {
            text-align: center;
          }

          .SingleDeck__percentages__single__percent {
            font-size: 15px;
            font-weight: bold;
            color: #a74482;
          }

          .SingleDeck__percentages__single__wildcard {
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }
}

export default SingleDeck;
