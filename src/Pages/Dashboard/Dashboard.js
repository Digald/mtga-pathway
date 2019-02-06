import React, { Component } from "react";
import "./Dashboard.css";
// Components
import CornerSpace from "../../Components/CornerSpace/CornerSpace";
import TopBar from "../../Components/TopBar/TopBar";
import SideBar from "../../Components/SideBar/SideBar";

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard main-grid">
        <CornerSpace />
        <TopBar />
        <SideBar />
        <div />
      </div>
    );
  }
}

export default Dashboard;
