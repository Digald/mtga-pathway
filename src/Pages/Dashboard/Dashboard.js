import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Link to="deckfinder">To Deck Finder</Link>
      </div>
    );
  }
}

export default Dashboard;
