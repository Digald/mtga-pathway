import React, { Component } from "react";
import "./SaveDeleteDecksBtn.css";

class SaveDeleteDecksBtn extends Component {
  render() {
    const { clickEvent, text } = this.props;
    return (
      <button className="SaveDeleteDecksBtn" onClick={() => clickEvent()}>
        {text}
      </button>
    );
  }
}

export default SaveDeleteDecksBtn;
