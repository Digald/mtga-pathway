import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://43aed916fca04830b52f3fc1330db07a@sentry.io/1777349"
});
// Components
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import DashBoardView from "../components/DashboardView";
import LoadingPage from "../components/LoadingPage";
import Layout from "../components/Layout";
import FileError from "../components/FileError";
import FetchWorker from "../utils/fetch.worker";

class Dashboard extends Component {
  state = {
    isLoaded: false,
    isInvalidFile: false,
    message: "",
    newCards: [],
    playerCards: [],
    playerTokens: []
  };

  onWorkerMessage = event => this.setState({ latestMessage: event.data });

  componentDidMount() {
    const decksAge = localStorage.getItem("decksAge");
    // check the time set in local storage
    if (!decksAge) {
      localStorage.setItem("decksAge", parseFloat(Date.now()) / 1000);
      console.log("NO TIME DATA");
    }
    // Test to see if more than two days have passed
    if ((parseFloat(Date.now()) / 1000) - parseFloat(decksAge) >= 172800) {
      console.log("TIME TO SCRAPE");
      // if so, run worker to get new decks for the user
      if (window.Worker) {
        // this.worker = new FetchWorker();
        // this.worker.postMessage("from Host");
        // this.worker.addEventListener("message", this.onWorkerMessage);
      }
    }
    // test worker
    // this.worker = new FetchWorker();
    // this.worker.postMessage("from Host");
    // this.worker.addEventListener("message", this.onWorkerMessage);
    // start listening the channel message
    global.ipcRenderer.send("readLog");
    global.ipcRenderer.on("loading-status", this.handleInitialMessage);
    global.ipcRenderer.on("invalid-logfile", this.handleWrongFile);
  }

  componentWillUnmount() {
    // stop listening to worker
    // this.worker.terminate();
    // stop listening the channel message
    global.ipcRenderer.removeListener(
      "loading-status",
      this.handleInitialMessage
    );
    global.ipcRenderer.removeListener("invalid-logfile", this.handleWrongFile);
  }

  handleInitialMessage = (event, arg) => {
    this.setState({
      isLoaded: arg.isLoaded,
      isInvalidFile: arg.isInvalidFile,
      newCards: arg.newCards,
      playerCards: arg.playerCards,
      playerTokens: arg.playerTokens
    });
  };

  handleWrongFile = (event, arg) => {
    this.setState({
      isInvalidFile: true,
      message: arg
    });
  };

  render() {
    console.log(this.state);
    const { isLoaded, isInvalidFile, newCards } = this.state;
    if (isInvalidFile) {
      return <FileError message={this.state.message} />;
    }
    if (!isLoaded) {
      return (
        <Layout>
          <LoadingPage />
        </Layout>
      );
    }
    return (
      <Layout>
        <div className="Dashboard main-grid">
          <CornerSpace />
          <TopBar title="DASHBOARD" activePage="dashboard" />
          <SideBar activePage="dashboard" />
          <DashBoardView newCardProps={newCards} />
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
