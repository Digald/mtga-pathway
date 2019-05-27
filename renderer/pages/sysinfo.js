import React, { Component } from "react";
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
