import React, { Component } from "react";

class ImportButton extends Component {
  openFileDialog = () => {
    global.ipcRenderer.send("openDialog");
  };

  render() {
    return (
      <button
        className="SettingsView__importLog"
        onClick={() => this.openFileDialog()}
      >
        Import a log file...
        <style jsx>{`
          .SettingsView__importLog {
            background-color: #ff3562;
            color: white;
            border: none;
            margin: 0;
            padding: 20px;
            box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </button>
    );
  }
}

export default ImportButton;
