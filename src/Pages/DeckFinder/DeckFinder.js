import React, { Component } from "react";
import "./DeckFinder.css";
// Components
import CornerSpace from "../../Components/CornerSpace/CornerSpace";
import TopBar from "../../Components/TopBar/TopBar";
import SideBar from "../../Components/SideBar/SideBar";

class DeckFinder extends Component {
  render() {
    return (
      <div className="DeckFinder main-grid">
        <CornerSpace />
        <TopBar title="DECK FINDER" activePage="deckfinder"/>
        <SideBar activePage="deckfinder"/>
      </div>
    );
  }
}

export default DeckFinder;
