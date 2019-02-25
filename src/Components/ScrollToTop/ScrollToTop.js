import React, { Component } from "react";
import "./ScrollToTop.css";
import uparrow from "../../assets/Uparrow.svg";

class ScrollToTop extends Component {
  scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("ScrollToTop").style.display = "block";
    } else {
      document.getElementById("ScrollToTop").style.display = "none";
    }
  };

  handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  render() {
    window.onscroll = () => {
      this.scrollFunction();
    };
    return (
      <button onClick={() => this.handleClick()} id="ScrollToTop">
        <img src={uparrow} alt="" />
        <p>TOP</p>
      </button>
    );
  }
}

export default ScrollToTop;
