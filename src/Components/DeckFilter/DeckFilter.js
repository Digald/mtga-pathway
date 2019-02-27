import React, { Component } from "react";
import "./DeckFilter.css";
import ColorToggle from "../../Components/ColorToggle/ColorToggle";

class DeckFilter extends Component {
  state = {
    isChecked: ""
  };

  handleClick = () => {
    const { isChecked } = this.state;
    if (isChecked === "checked") {
      this.setState({
        isChecked: ""
      });
    } else {
      this.setState({
        isChecked: "checked"
      });
    }
  };

  render() {
    return (
      <div className="DeckFilter">
        <p className="DeckFilter__title">Filter</p>
        <div className="DeckFilter__colorList">
          <ColorToggle color="white-color" />
          <ColorToggle color="blue-color" />
          <ColorToggle color="black-color" />
          <ColorToggle color="red-color" />
          <ColorToggle color="green-color" />
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
