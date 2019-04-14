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
    isLoaded: false,
    warningMessage: ""
  };

  constructor() {
    super();
    this.checkLoadingStatus = this.checkLoadingStatus.bind(this);
    ipcRenderer.on("loading-status", this.checkLoadingStatus);

    this.checkLogFile = this.checkLogFile.bind(this);
    ipcRenderer.on("invalid-logfile", this.checkLogFile);

    ipcRenderer.on("correct-logfile", this.checkLogFile);
  }

  checkLogFile = (event, arg) => {
    if (arg.length < 1) {
      this.setState({
        warningMessage: ""
      });
    }
    this.setState({
      warningMessage: arg
    });
  };

  checkLoadingStatus = (event, arg) => {
    this.setState({
      isLoaded: arg
    });
  };

  render() {
    if (this.state.warningMessage.length > 1) {
      return <p className="log-warning">{this.state.warningMessage}</p>;
    }
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
