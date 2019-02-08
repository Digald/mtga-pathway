import React, { Component } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
// Components
import dash_active from "../../assets/navigation/dash-active.svg";
import dash_inactive from "../../assets/navigation/dash-inactive.svg";
import deck_active from "../../assets/navigation/deck-active.svg";
import deck_inactive from "../../assets/navigation/deck-inactive.svg";

class SideBar extends Component {
  render() {
    const { activePage } = this.props;
    let dash, deck;
    if (activePage === "dashboard") {
      dash = dash_inactive;
      deck = deck_active
    } else if (activePage === "deckfinder") {
      dash = dash_active;
      deck = deck_inactive;
    }
    return (
      <div className="SideBar">
        <Link to="/" className="SideBar__icon">
          <img src={dash} alt="Dashboard" />
        </Link>
        <Link to="/deckfinder" className="SideBar__icon">
          <img src={deck} alt="Decklist" />
        </Link>
      </div>
    );
  }
}

export default SideBar;
