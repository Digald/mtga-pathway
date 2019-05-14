import React, { Component } from "react";
import Link from "next/link";

class SideBar extends Component {
  render() {
    const { activePage } = this.props;
    let dash, deck, settings;
    if (activePage === "dashboard") {
      dash = "/static/navigation/dash-inactive.svg";
      deck = "/static/navigation/deck-active.svg";
      settings = "/static/navigation/cog-active.svg";
    } else if (activePage === "deckfinder") {
      dash = "/static/navigation/dash-active.svg";
      deck = "/static/navigation/deck-inactive.svg";
      settings = "/static/navigation/cog-active.svg";
    } else if (activePage === "settings") {
      dash = "/static/navigation/dash-active.svg";
      deck = "/static/navigation/deck-active.svg";
      settings = "/static/navigation/cog-inactive.svg";
    }
    return (
      <div className="SideBar">
        <Link href="/">
          <img className="SideBar__icon icon1" src={dash} alt="Dashboard" />
        </Link>
        <Link href="/deckfinder">
          <img className="SideBar__icon icon2" src={deck} alt="Decklist" />
        </Link>
        <Link href="/settings">
          <img className="SideBar__icon icon3" src={settings} alt="Settings" />
        </Link>
        <style jsx>{`
          .SideBar {
            grid-area: 2 / 1 / 3 / 2;
            background-color: #1b1b3a;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }

          .SideBar__icon {
            margin-top: 50px;
            padding: 10px;
            position: fixed;
          }

          .icon2 {
            top: 175px;
          }

          .icon3 {
            top: 300px;
          }
        `}</style>
      </div>
    );
  }
}

export default SideBar;
