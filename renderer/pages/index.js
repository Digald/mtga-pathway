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
    hasDecks: false,
    isInvalidFile: false,
    message: "",
    newCards: [],
    playerCards: [],
    isFirstTimeWorker: false,
    workerReady: false
  };

  componentDidMount() {
    if (!localStorage.getItem("decksAge")) {
      // have to run the first time no matter what
      localStorage.setItem("decksAge", parseFloat(Date.now()) / 1000);
      this.setState({
        isFirstTimeWorker: true
      });
    }

    // start listening the channel message
    global.ipcRenderer.send("readLog");
    global.ipcRenderer.on("loading-status", this.handleInitialMessage);
    global.ipcRenderer.on("invalid-logfile", this.handleWrongFile);
  }

  componentWillUnmount() {
    // stop listening to worker
    this.worker.terminate();
    // stop listening the channel message
    global.ipcRenderer.removeListener(
      "loading-status",
      this.handleInitialMessage
    );
    global.ipcRenderer.removeListener("invalid-logfile", this.handleWrongFile);
  }

  dispatchWorker = () => {
    const decksAge = localStorage.getItem("decksAge");
    const decks = JSON.parse(localStorage.getItem("decks"));
    const { playerCards, playerTokens, isFirstTimeWorker } = this.state;
    if (typeof playerCards === "object" && playerTokens && window.Worker) {
      this.worker = new FetchWorker();
      this.worker.postMessage({
        playerCards,
        playerTokens,
        decksAge,
        isFirstTimeWorker,
        decks
      });
    }
  };

  onWorkerMessage = event => {
    if (!localStorage.getItem("decks")) {
      localStorage.setItem("decks", JSON.stringify(event.data));
      this.setState({
        hasDecks: true
      });
      return;
    }
    localStorage.setItem("decks", JSON.stringify(event.data));
    this.setState({
      hasDecks: true
    });
  };

  handleInitialMessage = (event, arg) => {
    this.setState({
      isLoaded: arg.isLoaded,
      isInvalidFile: arg.isInvalidFile,
      newCards: arg.newCards,
      playerCards: arg.playerCards,
      playerTokens: arg.playerTokens,
      workerReady: true
    });
  };

  handleWrongFile = (event, arg) => {
    this.setState({
      isInvalidFile: true,
      message: arg
    });
  };

  render() {
    const {
      isLoaded,
      hasDecks,
      isInvalidFile,
      newCards,
      workerReady
    } = this.state;
    if (isInvalidFile) {
      return <FileError message={this.state.message} />;
    }
    if (workerReady && !hasDecks) {
      this.dispatchWorker();
      this.worker.addEventListener("message", this.onWorkerMessage);
    }
    if (!isLoaded || !hasDecks) {
      return (
        <Layout>
          <LoadingPage status={{ isLoaded, hasDecks }} />
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
