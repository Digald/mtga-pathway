import React, { Component } from "react";
import "./DeckListView.css";
import CardData from "../CardData/CardData";
const settings = window.require("electron-settings");

class DeckListView extends Component {
  state = {
    decklist: settings.get("dataToRender.decklist"),
    types: []
  };

  componentDidMount() {
    const { decklist, types } = this.state;
    decklist.deckList.forEach(card => {
      if (types.indexOf(card.type) !== -1) {
        return;
      }
      types.push(card.type);
      this.setState({
        types
      });
    });
  }

  render() {
    console.log(this.state);
    const { decklist, types } = this.state;
    return (
      <div className="DeckListView">
        <h2>{decklist.name}</h2>
        {types.map(type => {
          const renderList = decklist.deckList.map(card => {
            if (card.type === type) {
              return <CardData card={card} />;
            }
          });
        })}
      </div>
    );
  }
}

export default DeckListView;
