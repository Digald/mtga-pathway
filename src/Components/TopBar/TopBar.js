import React, { Component } from "react";
import mythic from "../../assets/tokens/mythic.svg";
import rare from "../../assets/tokens/rare.svg";
import uncommon from "../../assets/tokens/uncommon.svg";
import common from "../../assets/tokens/common.svg";
import coins from "../../assets/tokens/coins.svg";
import gem from "../../assets/tokens/gem.svg";
import "./TopBar.css";

class TopBar extends Component {
  render() {
    return (
      <div className="TopBar">
        <h1 className="TopBar__page">DASHBOARD</h1>
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
