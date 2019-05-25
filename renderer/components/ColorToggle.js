import React, { Component } from "react";

class ColorToggle extends Component {
  state = {
    cssModifier: false
  };

  handleClick = color => {
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
        className={`ColorToggle__${color} ${cssClass} ColorToggle__default`}
      >
        <style jsx>{`
          .ColorToggle__white-color {
            background: url("/static/manasymbols/W.svg") no-repeat;
          }
          .ColorToggle__blue-color {
            background: url("/static/manasymbols/U.svg") no-repeat;
          }
          .ColorToggle__black-color {
            background: url("/static/manasymbols/B.svg") no-repeat;
          }
          .ColorToggle__red-color {
            background: url("/static/manasymbols/R.svg") no-repeat;
          }
          .ColorToggle__green-color {
            background: url("/static/manasymbols/G.svg") no-repeat;
          }
          .ColorToggle__default {
            height: 50px;
            width: 50px;
            border: none;
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
