import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://43aed916fca04830b52f3fc1330db07a@sentry.io/1777349"
});
// Components
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Layout from "../components/Layout";
import DeckFinderView from "../components/DeckFinderView";

class DeckFinder extends Component {
  render() {
    return (
      <Layout>
        <div className="DeckFinder main-grid">
          <CornerSpace />
          <TopBar title="DECK FINDER" activePage="deckfinder" />
          <SideBar activePage="deckfinder" />
          <div onClick={somefunc()}></div>
          <DeckFinderView />
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
