import React, { Component } from "react";
// Components
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import DashBoardView from "../components/DashboardView";
import LoadingPage from "../components/LoadingPage";
import Layout from "../components/Layout";
import FileError from "../components/FileError";

class Dashboard extends Component {
  state = {
    isLoaded: false,
    isInvalidFile: false,
    message: ""
  };

  componentDidMount() {
    // start listening the channel message
    global.ipcRenderer.on("loading-status", this.handleMessage);
    global.ipcRenderer.on("invalid-logfile", this.handleWrongFile);
  }

  componentWillUnmount() {
    // stop listening the channel message
    global.ipcRenderer.removeListener("loading-status", this.handleMessage);
    global.ipcRenderer.removeListener("invalid-logfile", this.handleWrongFile);
  }

  handleMessage = (event, arg) => {
    this.setState({
      isLoaded: arg.isLoaded,
      isInvalidFile: arg.isInvalidFile
    });
  };

  handleWrongFile = (event, arg) => {
    this.setState({
      isInvalidFile: true,
      message: arg
    });
  };

  render() {
    // testing get
    const { isLoaded, isInvalidFile } = this.state;
    if (isInvalidFile) {
      return <FileError message={this.state.message} />;
    }
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
