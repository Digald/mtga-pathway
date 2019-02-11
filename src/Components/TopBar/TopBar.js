import React, { Component } from "react";
import "./TopBar.css";
import mythic from "../../assets/tokens/mythic.svg";
import rare from "../../assets/tokens/rare.svg";
import uncommon from "../../assets/tokens/uncommon.svg";
import common from "../../assets/tokens/common.svg";
import coins from "../../assets/tokens/coins.svg";
import gem from "../../assets/tokens/gem.svg";
import deck_little from "../../assets/navigation/deck-little.svg";
import dash_little from "../../assets/navigation/dash-little.svg";
const settings = window.require('electron-settings');

class TopBar extends Component {
  state = {
    tokens: settings.get('mtgaCardData.playerTokens')
  }
  render() {
    const { activePage, title } = this.props;
    const {tokens} = this.state;
    let icon;
    if (activePage === "dashboard") {
      icon = dash_little;
    } else if (activePage === "deckfinder") {
      icon = deck_little;
    }
    return (
      <div className="TopBar">
        <div className="TopBar__title">
          <img src={icon} alt="" />
          <h1 className="TopBar__title__name">{title}</h1>
        </div>
        <ul className="TopBar__tokens">
          <li>
            <p>{tokens.wcMythic}</p>
            <img src={mythic} alt="M" />
          </li>
          <li>
            <p>{tokens.wcRare}</p>
            <img src={rare} alt="R" />
          </li>
          <li>
            <p>{tokens.wcUncommon}</p>
            <img src={uncommon} alt="UC" />
          </li>
          <li>
            <p>{tokens.wcCommon}</p>
            <img src={common} alt="C" />
          </li>
          <li>
            <p>{tokens.gold}</p>
            <img src={coins} alt="coins" />
          </li>
          <li>
            <p>{tokens.gems}</p>
            <img src={gem} alt="gem" />
          </li>
        </ul>
      </div>
    );
  }
}

export default TopBar;
