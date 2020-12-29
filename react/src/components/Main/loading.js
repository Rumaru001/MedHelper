import React from "react";

export class Loading extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-center center_loading">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
