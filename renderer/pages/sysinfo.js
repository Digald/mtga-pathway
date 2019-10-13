import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://43aed916fca04830b52f3fc1330db07a@sentry.io/1777349"
});
// Components
import Layout from "../components/Layout";
import CornerSpace from "../components/CornerSpace";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import SysinfoView from "../components/SysinfoView";

class Sysinfo extends Component {
  render() {
    return (
      <Layout>
        <div className="Sysinfo main-grid">
          <CornerSpace />
          <TopBar title="SYS INFO" activePage="settings" />
          <SideBar activePage="settings" />
          <SysinfoView />
        </div>
        <style jsx>{`
            .Sysinfo {
                height: 100%;
            }
        `}</style>
      </Layout>
    );
  }
}

export default Sysinfo;
