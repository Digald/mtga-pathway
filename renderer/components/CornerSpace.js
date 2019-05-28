import React, { Component } from "react";

class CornerSpace extends Component {
  render() {
    return (
      <div className="CornerSpace">
        <style jsx>{`
          .CornerSpace {
            grid-area: 1 / 1 / 2 / 2;
            background-color: #ff3562;
            top: 0;
            position: sticky;
            -webkit-app-region: drag;
          }
        `}</style>
      </div>
    );
  }
}

export default CornerSpace;
