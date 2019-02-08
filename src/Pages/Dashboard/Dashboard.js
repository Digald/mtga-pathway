import React, { Component } from "react";
import "./Dashboard.css";
// Components
import CornerSpace from "../../Components/CornerSpace/CornerSpace";
import TopBar from "../../Components/TopBar/TopBar";
import SideBar from "../../Components/SideBar/SideBar";
import DashBoardView from '../../Components/DashboardView/DashboardView';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard main-grid">
        <CornerSpace />
        <TopBar title="DASHBOARD" activePage="dashboard"/>
        <SideBar activePage="dashboard"/>
        <DashBoardView/>
      </div>
    );
  }
}

export default Dashboard;
