import React, { Component } from "react";
import "./SettingsView.css";
// Components
const settings = window.require("electron-settings");
const os = window.require("os");

class SettingsView extends Component {
  render() {
    const userPath = settings.get("rawData.path");
    console.log(os.platform());
    return (
      <div className="SettingsView">
        <h2 className="DashboardView__title">Sys Info</h2>
        <p>
          Log File Path:{" "}
          <span className="SettingsView__important-text">{userPath}</span>
        </p>
        <p className="SettingsView__warning">
          NOTE: If the app is not propery finding your game's log file, try
          going to{" "}
          <span className="SettingsView__important-text">
            File > Import Log File
          </span>{" "}
          or hit <span className="SettingsView__important-text">CTRL+O</span> to
          manually search your file system.
        </p>
        <p>
          OS Platform:{" "}
          <span className="SettingsView__important-text">{os.platform()}</span>
        </p>
        <p>Home Directory: {os.homedir()}</p>
        <p className="SettingsView__info">Having trouble with MTGA Pathway? Contact me at markalaniz000@gmail.com</p>
      </div>
    );
  }
}

export default SettingsView;
