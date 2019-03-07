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
    const { decklist, types } = this.state;
    return (
      <div className="DeckListView">
        <h2>{decklist.name}</h2>
        {types.map(type => {
          return <CardData key={type} card={decklist.deckList} type={type} />
        })}
      </div>
    );
  }
}

export default DeckListView;
