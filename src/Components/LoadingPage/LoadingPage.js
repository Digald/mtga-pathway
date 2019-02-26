import React, { Component } from "react";
import "./LoadingPage.css";
import loader from '../../assets/loader.svg';
const {ipcRenderer} = window.require('electron');

class LoadingPage extends Component {

  componentDidMount() {
    ipcRenderer.send("read-log");
  }

  render() {
    return (
      <div className="LoadingPage">
        <h2 className="LoadingPage__title">LOADING...</h2>
        <img src={loader} alt=""/>
        <p>Is this your first time loading the app?</p>
        <p>Putting together data may take a minute.</p>
      </div>
    );
  }
}

export default LoadingPage;