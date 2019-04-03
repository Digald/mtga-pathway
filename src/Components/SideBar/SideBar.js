import React, { Component } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
// Components
import dash_active from "../../assets/navigation/dash-active.svg";
import dash_inactive from "../../assets/navigation/dash-inactive.svg";
import deck_active from "../../assets/navigation/deck-active.svg";
import deck_inactive from "../../assets/navigation/deck-inactive.svg";
import cog_active from '../../assets/navigation/cog-active.svg';
import cog_inactive from '../../assets/navigation/cog-inactive.svg';

class SideBar extends Component {
  render() {
    const { activePage } = this.props;
    let dash, deck, settings;
    if (activePage === "dashboard") {
      dash = dash_inactive;
      deck = deck_active
      settings = cog_active;
    } else if (activePage === "deckfinder") {
      dash = dash_active;
      deck = deck_inactive;
      settings = cog_active;
    } else if (activePage === "settings") {
      dash = dash_active;
      deck = deck_active;
      settings = cog_inactive;
    }
    return (
      <div className="SideBar">
        <Link to="/" className="SideBar__icon icon1">
          <img src={dash} alt="Dashboard" />
        </Link>
        <Link to="/deckfinder" className="SideBar__icon icon2">
          <img src={deck} alt="Decklist" />
        </Link>
        <Link to="/settings" className="SideBar__icon icon3">
          <img src={settings} alt="Settings" />
        </Link>
      </div>
    );
  }
}

export default SideBar;
