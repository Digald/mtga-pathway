import React, { Component } from "react";
import "./SettingsView.css";
// Components

class SettingsView extends Component {
  render() {
    return (
      <div className="SettingsView">
        <h2 className="DashboardView__title">Settings</h2>
        <p>Log File Path: <input value="Hello"/></p>
      </div>
    );
  }
}

export default SettingsView;
