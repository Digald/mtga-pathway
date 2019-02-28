import React, { Component } from "react";
import "./DeckFilter.css";
import ColorToggle from "../../Components/ColorToggle/ColorToggle";
const { ipcRenderer } = window.require("electron");

class DeckFilter extends Component {
  state = {
    isChecked: ""
  };

  handleClick = () => {
    const { isChecked } = this.state;
    let updateCheck;
    if (isChecked === "checked") {
      this.setState({
        isChecked: ""
      });
      updateCheck = "";
    } else {
      this.setState({
        isChecked: "checked"
      });
      updateCheck = "checked";
    }
    ipcRenderer.send("send-restrict-color", updateCheck);
  };

  render() {
    return (
      <div className="DeckFilter">
        <p className="DeckFilter__title">Filter</p>
        <div className="DeckFilter__colorList">
          <ColorToggle color="white-color" symbol="w" />
          <ColorToggle color="blue-color" symbol="u" />
          <ColorToggle color="black-color" symbol="b" />
          <ColorToggle color="red-color" symbol="r" />
          <ColorToggle color="green-color" symbol="g" />
        </div>
        <label className="DeckFilter__container">
          Find Selected Colors Only
          <input
            type="checkbox"
            onChange={() => this.handleClick()}
            checked={this.state.isChecked}
          />
          <span className="checkmark" />
        </label>
      </div>
    );
  }
}

export default DeckFilter;
