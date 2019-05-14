import React, { Component } from "react";
// Components
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
// import DashBoardView from "../../Components/DashboardView/DashboardView";
import LoadingPage from "../components/LoadingPage";
import Layout from "../components/Layout";

class Dashboard extends Component {
  state = {
    isLoaded: true
  };

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded)
      return (
        <Layout>
          <LoadingPage />
        </Layout>
      );
    return (
      <Layout>
        <div className="Dashboard main-grid">
          <CornerSpace />
          {/* <TopBar title="DASHBOARD" activePage="dashboard" /> */}
          <SideBar activePage="dashboard" />
        {/* <DashBoardView /> */}
        </div>
        <style jsx>{`
          .Dashboard {
            height: 100%;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;
