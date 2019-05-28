import React, { Component } from "react";

class TopBar extends Component {
  state = {
    tokens: {}
  };

  componentDidMount() {
    const res = global.ipcRenderer.sendSync("get-tokens-TopBar", "");
    if (res) {
      this.setState({
        tokens: res
      });
    }
  }

  render() {
    const { activePage, title } = this.props;
    const { tokens } = this.state;
    console.log(tokens);
    let icon;
    if (activePage === "dashboard") {
      icon = "/static/navigation/dash-little.svg";
    } else if (activePage === "deckfinder") {
      icon = "/static/navigation/deck-little.svg";
    } else if (activePage === "settings") {
      icon = "/static/navigation/cog-little.svg";
    }
    return (
      <div className="TopBar">
        <div className="TopBar__title">
          <img src={icon} alt="" />
          <h1 className="TopBar__title__name">{title}</h1>
        </div>
        <ul className="TopBar__tokens">
          <li>
            <p>{tokens.wcMythic}</p>
            <img src="/static/tokens/mythic.svg" alt="M" />
          </li>
          <li>
            <p>{tokens.wcRare}</p>
            <img src="/static/tokens/rare.svg" alt="R" />
          </li>
          <li>
            <p>{tokens.wcUncommon}</p>
            <img src="/static/tokens/uncommon.svg" alt="UC" />
          </li>
          <li>
            <p>{tokens.wcCommon}</p>
            <img src="/static/tokens/common.svg" alt="C" />
          </li>
          <li>
            <p>{tokens.gold}</p>
            <img src="/static/tokens/coins.svg" alt="coins" />
          </li>
          <li>
            <p>{tokens.gems}</p>
            <img src="/static/tokens/gem.svg" alt="gem" />
          </li>
        </ul>
        <style jsx>{`
          .TopBar {
            grid-area: 1 / 2 / 2 / 3;
            background-color: #1b1b3a;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 100%;
            top: 0;
            position: sticky;
            z-index: 9999;
            -webkit-app-region: drag
          }

          .TopBar__title {
            display: flex;
          }

          .TopBar__title__name {
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 0.23em;
            font-weight: 400;
            margin-left: 5px;
          }

          .TopBar__tokens {
            list-style-type: none;
            display: flex;
            flex-direction: row;
            color: #f84aa7;
            font-weight: bold;
            font-size: 12px;
          }

          .TopBar__tokens li {
            margin: 0 10px;
            display: flex;
          }
          .TopBar__tokens li p {
            margin-right: 3px;
          }
          .TopBar__tokens li img {
            margin-left: 3px;
          }
        `}</style>
      </div>
    );
  }
}

export default TopBar;
