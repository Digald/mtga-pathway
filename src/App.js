import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DeckFinder from "./Pages/DeckFinder/DeckFinder";
const { ipcRenderer } = window.require("electron");

class App extends Component {
  state = {
    isLoaded: false
  };

  constructor() {
    super();
    ipcRenderer.on("loading-status", (event, arg) => {
      this.setState({
        isLoaded: arg
      });
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Dashboard {...props} isLoaded={this.state.isLoaded} />
            )}
          />
          <Route
            path="/deckfinder"
            render={props => (
              <DeckFinder {...props} isLoaded={this.state.isLoaded} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
