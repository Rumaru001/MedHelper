import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import optionsIcon from "../../optionsIcon.svg";
import { Link } from "react-router-dom";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");
    var newStyle = Object.assign({}, style);
    newStyle.left = "-10px";
    newStyle["backgroundColor"] = "rgb(240, 240, 240)";
    newStyle["border"] = "solid grey 1px";
    return (
      <div
        ref={ref}
        style={newStyle}
        className={`${className} shadow`}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled m-0">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default class OptionDropdown extends React.Component {
  render() {
    return (
      <Dropdown className={this.props.className}>
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components"
          //onClick={this.animation}
        >
          <img src={optionsIcon} className="optionsIcon my-auto" alt="options" />
        </Dropdown.Toggle>
        <Dropdown.Menu
          as={CustomMenu}
          className="animate__animated animate__zoomIn faster"
        >
          {this.props.children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
