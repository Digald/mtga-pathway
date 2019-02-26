import React, { Component } from "react";
import "./DeckList.css";
// Components
import CornerSpace from "../../Components/CornerSpace/CornerSpace";
import TopBar from "../../Components/TopBar/TopBar";
import SideBar from "../../Components/SideBar/SideBar";

class DeckList extends Component {
  render() {
    return (
      <div className="DeckList main-grid">
        <CornerSpace />
        <TopBar title="DECKLIST" activePage="deckfinder" />
        <SideBar activePage="deckfinder" />
        <p>Sup my dood</p>
      </div>
    );
  }
}

export default DeckList;
