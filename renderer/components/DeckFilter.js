import React, { Component } from "react";
import ColorToggle from "./ColorToggle";

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
    global.ipcRenderer.send("send-restrict-color", updateCheck);
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
        <style jsx>{`
          .DeckFilter {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            flex-direction: column;
          }
          .DeckFilter__colorList {
            margin-bottom: 1rem;
          }

          .DeckFilter__title {
            letter-spacing: 0.2rem;
          }

          .DeckFilter button {
            border: none;
            width: 3rem;
            height: 3rem;
            background-color: white;
            margin: 0 2px;
            padding: 0;
          }

          /* Slider Styles */
          .DeckFilter__container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          /* Hide the browser's default checkbox */
          .DeckFilter__container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          /* Create a custom checkbox */
          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #eee;
          }

          /* On mouse-over, add a grey background color */
          .DeckFilter__container:hover input ~ .checkmark {
            background-color: #ccc;
          }

          /* When the checkbox is checked, add a blue background */
          .DeckFilter__container input:checked ~ .checkmark {
            background-color: #ff3562;
          }

          /* Create the checkmark/indicator (hidden when not checked) */
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }

          /* Show the checkmark when checked */
          .DeckFilter__container input:checked ~ .checkmark:after {
            display: block;
          }

          /* Style the checkmark/indicator */
          .DeckFilter__container .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        `}</style>
      </div>
    );
  }
}

export default DeckFilter;
