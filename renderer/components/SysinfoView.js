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
        <button
          className="SettingsView__importLog"
          onClick={() => this.openFileDialog()}
        >
          Import a log file...
        </button>
        <p className="SettingsView__warning">
          NOTE: If the app is not propery finding your game's log file, try to
          import it manually above.
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

          .SettingsView__importLog {
            background-color: #ff3562;
            color: white;
            border: none;
            margin: 0;
            padding: 20px;
            box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.5);
          }

          .SettingsView__warning {
            border: 1px solid black;
            padding: 5px;
            background-color: rgba(255, 0, 0, 0.5);
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
