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

class TopBar extends Component {
  render() {
    const { activePage } = this.props;
    let icon;
    if (activePage === "dashboard") {
      icon = dash_little;
    } else if (activePage === "decklist") {
      icon = deck_little;
    }
    return (
      <div className="TopBar">
        <div className="TopBar__title">
          <img src={icon} alt="" />
          <h1 className="TopBar__title__name">DASHBOARD</h1>
        </div>
        <ul className="TopBar__tokens">
          <li>
            <p>0</p>
            <img src={mythic} alt="mythic" />
          </li>
          <li>
            <p>0</p>
            <img src={rare} alt="rare" />
          </li>
          <li>
            <p>0</p>
            <img src={uncommon} alt="uncommon" />
          </li>
          <li>
            <p>0</p>
            <img src={common} alt="common" />
          </li>
          <li>
            <p>0</p>
            <img src={coins} alt="coins" />
          </li>
          <li>
            <p>0</p>
            <img src={gem} alt="gem" />
          </li>
        </ul>
      </div>
    );
  }
}

export default TopBar;
