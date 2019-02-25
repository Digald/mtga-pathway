import React, { Component } from "react";
import "./DeckFinder.css";
// Components
import CornerSpace from "../../Components/CornerSpace/CornerSpace";
import TopBar from "../../Components/TopBar/TopBar";
import SideBar from "../../Components/SideBar/SideBar";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import DeckFinderView from "../../Components/DeckFinderView/DeckFinderView";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

class DeckFinder extends Component {
  state = {
    isLoaded: false
  };
  render() {
    const { isLoaded } = this.props;
    if (!isLoaded) return <LoadingPage />;
    return (
      <div className="DeckFinder main-grid">
        <CornerSpace />
        <TopBar title="DECK FINDER" activePage="deckfinder" />
        <SideBar activePage="deckfinder" />
        <DeckFinderView />
        <ScrollToTop />
      </div>
    );
  }
}

export default DeckFinder;
