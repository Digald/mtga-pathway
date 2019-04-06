import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DeckFinder from "./Pages/DeckFinder/DeckFinder";
import DeckList from "./Pages/DeckList/DeckList";
import Settings from "./Pages/Settings/Settings";
const { ipcRenderer } = window.require("electron");

class App extends Component {
  state = {
    isLoaded: false
  };

  constructor() {
    super();
    this.checkLoadingStatus = this.checkLoadingStatus.bind(this);
    ipcRenderer.on("loading-status", this.checkLoadingStatus);
  }

  checkLoadingStatus = (event, arg) => {
    this.setState({
      isLoaded: arg
    });
  };

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
          <Route exact path="/decklist" component={DeckList} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </Router>
    );
  }
}

export default App;
