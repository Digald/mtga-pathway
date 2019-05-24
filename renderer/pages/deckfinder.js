import React, { Component } from "react";
// Components
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Layout from "../components/Layout";
// import LoadingPage from "../../Components/LoadingPage/LoadingPage";
// import DeckFinderView from "../../Components/DeckFinderView/DeckFinderView";

class DeckFinder extends Component {
  render() {
    return (
      <Layout>
        <div className="DeckFinder main-grid">
          <CornerSpace />
          <TopBar title="DECK FINDER" activePage="deckfinder" />
          <SideBar activePage="deckfinder" />
          {/* <DeckFinderView /> */}
          <style jsx>{`
            .DeckFinder {
              height: 100%;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default DeckFinder;
