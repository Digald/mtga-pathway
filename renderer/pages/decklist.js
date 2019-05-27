import React, { Component } from "react";
// Components
import Layout from '../components/Layout';
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import DeckListView from "../components/DeckListView";

class DeckList extends Component {
  render() {
    return (
      <Layout>
        <div className="DeckList main-grid">
          <CornerSpace />
          <TopBar title="DECKLIST" activePage="deckfinder" />
          <SideBar activePage="deckfinder" />
          <DeckListView />
          <style jsx>{`
            .DeckList {
              height: 100%;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default DeckList;
