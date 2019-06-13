import React, { Component } from "react";
import CardData from "./CardData";

class DeckListView extends Component {
  state = {
    decklist: [],
    types: []
  };

  componentDidMount() {
    const res = global.ipcRenderer.sendSync("get-insideDeckList");
    this.setState(
      {
        decklist: res
      },
      () => {
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
    );
  }

  render() {
    const { decklist, types } = this.state;
    console.log(decklist);
    return (
      <div className="DeckListView">
        <h2>{decklist.name}</h2>
        {types.map(type => {
          return <CardData key={type} card={decklist.deckList} type={type} />;
        })}
        <style jsx>{`
          .DeckListView {
            padding: 1rem;
          }
        `}</style>
      </div>
    );
  }
}

export default DeckListView;
