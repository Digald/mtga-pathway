import React, { Component } from "react";

class TitleBar extends Component {
  render() {
    return (
      <div className="TitleBar">
        <style jsx>{`
          .TitleBar {
            background-color: cyan;
            height: 20px;
            width: 100%;
            -webkit-app-region: drag
          }
        `}</style>
      </div>
    );
  }
}

export default TitleBar;
