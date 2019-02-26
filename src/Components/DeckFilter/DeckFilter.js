import React, { Component } from "react";
import "./DeckFilter.css";

class DeckFilter extends Component {
  state = {
    cssModifier: "defaultf"
  };

  handleClick = () => {
    console.log('clicked');
    this.setState({
      cssModifier: "includesf"
    });
  };

  render() {
    const { cssModifier } = this.state;
    return (
      <div className="DeckFilter">
        <button
          onClick={() => this.handleClick()}
          className={`DeckFilter__white-color ${cssModifier}`}
        />
        <button className={`DeckFilter__blue-color ${cssModifier}`} />
        <button className={`DeckFilter__black-color ${cssModifier}`} />
        <button className={`DeckFilter__red-color ${cssModifier}`} />
        <button className={`DeckFilter__green-color ${cssModifier}`} />
      </div>
    );
  }
}

export default DeckFilter;
