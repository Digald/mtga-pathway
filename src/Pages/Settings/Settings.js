import React, { Component } from "react";
import "./Settings.css";
// Components
import CornerSpace from "../../Components/CornerSpace/CornerSpace";
import TopBar from "../../Components/TopBar/TopBar";
import SideBar from "../../Components/SideBar/SideBar";
import SettingsView from "../../Components/SettingsView/SettingsView";

class DeckList extends Component {
  render() {
    return (
      <div className="DeckList main-grid">
        <CornerSpace />
        <TopBar title="SETTINGS" activePage="settings" />
        <SideBar activePage="settings" />
        <SettingsView />
      </div>
    );
  }
}

export default DeckList;
