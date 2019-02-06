import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import DeckFinder from './Pages/DeckFinder/DeckFinder';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/deckfinder" component={DeckFinder} />
        </Switch>
      </Router>
    );
  }
}

export default App;
