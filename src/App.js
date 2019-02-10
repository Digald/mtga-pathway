import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import DeckFinder from './Pages/DeckFinder/DeckFinder';
const { ipcRenderer } = window.require('electron');

class App extends Component {
  componentDidMount() {
    ipcRenderer.send('read-log');
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/deckfinder" component={DeckFinder} />
        </Switch>
      </Router>
    );
  }
}

export default App;
