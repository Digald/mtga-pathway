import React, { Component } from "react";
// Components
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import DashBoardView from "../components/DashboardView";
import LoadingPage from "../components/LoadingPage";
import Layout from "../components/Layout";

class Dashboard extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    // start listening the channel message
    global.ipcRenderer.on("loading-status", this.handleMessage);
  }

  componentWillUnmount() {
    // stop listening the channel message
    global.ipcRenderer.removeListener("loading-status", this.handleMessage);
  }

  handleMessage = (event, message) => {
    this.setState({
      isLoaded: message
    });
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
          <TopBar title="DASHBOARD" activePage="dashboard" />
          <SideBar activePage="dashboard" />
          <DashBoardView />
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
