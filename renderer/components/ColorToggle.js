import React, { Component } from "react";

class ColorToggle extends Component {
  state = {
    cssModifier: false
  };

  handleClick = color => {
    // console.log(color);
    this.setState({
      cssModifier: !this.state.cssModifier
    });
    global.ipcRenderer.send("send-filter-color", this.props.symbol);
  };

  render() {
    let cssClass = "";
    const { cssModifier } = this.state;
    const { color } = this.props;
    if (cssModifier) {
      cssClass = "toggleFilter";
    }
    return (
      <button
        onClick={() => this.handleClick(color)}
        className={`ColorToggle__${color} ${cssClass}`}
      >
        <style jsx>{`
          .ColorToggle__white-color {
            background: url("../../assets/manasymbols/W.svg") no-repeat;
          }
          .ColorToggle__blue-color {
            background: url("../../assets/manasymbols/U.svg") no-repeat;
          }
          .ColorToggle__black-color {
            background: url("../../assets/manasymbols/B.svg") no-repeat;
          }
          .ColorToggle__red-color {
            background: url("../../assets/manasymbols/R.svg") no-repeat;
          }
          .ColorToggle__green-color {
            background: url("../../assets/manasymbols/G.svg") no-repeat;
          }

          .toggleFilter {
            border-bottom: 0.3rem solid #ff3562 !important;
          }
        `}</style>
      </button>
    );
  }
}

export default ColorToggle;
