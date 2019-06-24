import React, { Component } from "react";
import CardData from "./CardData";
import Link from "next/link";

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
        <button className="DeckListView__backButton">
          <Link href="/deckfinder">
            <img src="/static/navigation/backArrow.svg" alt="Back" />
          </Link>
        </button>
        <h2>{decklist.name}</h2>
        <h3>{decklist.complete_WO_Wildcards}% Complete With Your Current Collection</h3>
        <h3>{decklist.complete_W_Wildcards}% Complete With The Use Of Wildcards</h3>
        {types.map(type => {
          return <CardData key={type} card={decklist.deckList} type={type} />;
        })}
        <style jsx>{`
          .DeckListView {
            padding: 1rem;
          }
          .DeckListView h2{
            border-bottom: 1px solid grey;
          }
          .DeckListView__backButton {
            border: none;
            background-color: white;
          }
        `}</style>
      </div>
    );
  }
}

export default DeckListView;
