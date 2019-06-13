import React, { Component } from "react";

class SysinfoView extends Component {
  state = {
    platform: "",
    usersPath: ""
  };
  componentDidMount() {
    const res = global.ipcRenderer.sendSync("get-sysinfo");
    const { platform, usersPath } = res;
    if (platform) {
      this.setState({
        platform
      });
    }
    if (usersPath) {
      this.setState({
        usersPath
      });
    }
  }

  openFileDialog = () => {
    global.ipcRenderer.send("openDialog");
  };

  render() {
    const { usersPath, platform } = this.state;
    return (
      <div className="SettingsView">
        <h2 className="DashboardView__title">Sys Info</h2>
        <p>
          Log File Path:{" "}
          <span className="SettingsView__important-text">{usersPath}</span>
        </p>
        <p>
          OS Platform:{" "}
          <span className="SettingsView__important-text">{platform}</span>
        </p>
        <p>Data Sources: </p>
        <ul>
          <li>Scryfall</li>
          <li>MTGGoldfish</li>
        </ul>
        <p className="SettingsView__info">
          Having trouble with MTGA Pathway? Contact me at
          markalaniz000@gmail.com
        </p>
        <style jsx>{`
          .SettingsView {
            padding: 1rem;
          }
          .SettingsView__important-text {
            font-weight: bold;
          }

          .SettingsView__info {
            border: 1px solid black;
            padding: 5px;
            background-color: rgba(0, 255, 0, 0.5);
          }

          .SettingsView li {
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }
}
export default SysinfoView;
