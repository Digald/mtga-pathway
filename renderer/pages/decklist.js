import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://43aed916fca04830b52f3fc1330db07a@sentry.io/1777349"
});
// Components
import Layout from "../components/Layout";
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
