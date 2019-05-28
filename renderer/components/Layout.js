import React, { Component } from "react";
// import TitleBar from "./TitleBar";

class Layout extends Component {
  render() {
    return (
      <div>
        {/* <TitleBar /> */}
        {this.props.children}
        <style jsx global>{`
          html,
          body,
          #__next {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          .main-grid {
            display: grid;
            grid-template-columns: 100px auto;
            grid-template-rows: 50px auto;
          }

          .log-warning {
            /* background-color: red; */
            padding: 5%;
            color: red;
            font-weight: bold;
          }
        `}</style>
        <style jsx>{`
          div {
            height: 100%;
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default Layout;
