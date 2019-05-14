import React, { Component } from "react";

class LoadingPage extends Component {
  componentDidMount() {
    global.ipcRenderer.send("read-log");
  }

  render() {
    return (
      <div className="LoadingPage">
        <h2 className="LoadingPage__title">LOADING...</h2>
        <div className="lds-dual-ring" />
        <p>Is this your first time loading the app?</p>
        <p>Putting together data may take a minute.</p>
        <style jsx>{`
          .LoadingPage {
            background-color: #ff3562;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
          }

          .LoadingPage__title {
            font-size: 24px;
            letter-spacing: 0.23em;
          }

          .lds-dual-ring {
            display: inline-block;
            width: 64px;
            height: 64px;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 46px;
            height: 46px;
            margin: 1px;
            border-radius: 50%;
            border: 5px solid #fff;
            border-color: #fff transparent #fff transparent;
            animation: lds-dual-ring 1.2s linear infinite;
          }
          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default LoadingPage;
