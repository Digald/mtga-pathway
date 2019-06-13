import React, { Component } from "react";

class SaveDeleteDecksBtn extends Component {
  render() {
    const { clickEvent, text } = this.props;
    return (
      <button className="SaveDeleteDecksBtn" onClick={() => clickEvent()}>
        {text}
        <style jsx>{`
          .SaveDeleteDecksBtn {
            width: 100px;
            height: 2rem;
            background-color: #1b1b3a;
            color: white;
            border: none;
          }
        `}</style>
      </button>
    );
  }
}

export default SaveDeleteDecksBtn;
