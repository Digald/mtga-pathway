import React, { Component } from "react";
import ImportButton from "./ImportButton";

class FileError extends Component {
  render() {
    // const { isInvalidFile, message } = this.state;
    const {isInvalidFile, message} = this.props;
    return (
      <div className="FileError">
        <p>{message}</p>
        <ImportButton />
          <style jsx>{`
              .FileError {
                padding: 10%;
              }

              .FileError p {
                font-size: 20px;
              }
            `}</style>
      </div>
    );
  }
}

export default FileError;
