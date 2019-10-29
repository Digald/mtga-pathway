import React, { Component } from "react";

class LoadingPage extends Component {
  render() {
    return (
      <div className="LoadingPage">
        <h1 className="LoadingPage__title1">MTGA PATHWAY</h1>
        <h2 className="LoadingPage__title2">
          {this.props.isLoaded
            ? "LOADING CARD DATA..."
            : "LOADING YOUR DECKS..."}
        </h2>
        <div className="lds-dual-ring" />
        <p>We're working hard in the background. Please wait a moment.</p>
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

          .LoadingPage__title1 {
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
