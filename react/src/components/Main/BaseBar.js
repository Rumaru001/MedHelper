import React from "react";
import { Navigation } from "./Navigation";
import { Devider } from "./Devider";

export class BaseBar extends React.Component {
  render() {
    return (
      <div className="h-100 w-100 max-free-height">
        <div className="px-4">
          <Devider />
          <Navigation />
          <Devider />
        </div>
        {this.props.children}
      </div>
    );
  }
}
