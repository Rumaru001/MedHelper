import React from "react";

export class Forbidden extends React.Component {
  render() {
    return (
      <div className="child-center text-center w-100 vh-100 flex-column">
        <h2>Forbidden 403</h2>
        <h4>(you shall not pass)</h4>
      </div>
    );
  }
}
