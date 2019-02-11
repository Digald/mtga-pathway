import React, { Component } from "react";
import "./LoadingPage.css";
import loader from '../../assets/loader.svg';
class LoadingPage extends Component {
  render() {
    return (
      <div className="LoadingPage">
        <img src={loader} alt="Loading..."/>
        <p>Is this your first time loading the app?</p>
        <p>Putting together data may take a minute.</p>
      </div>
    );
  }
}

export default LoadingPage;
