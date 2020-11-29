import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MedCardFilters } from "./MedCardFilters.js";

export class SideNavBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogoCentered: "uncenterLogo",
    };
  }

  animateLogo() {
    this.setState({
      isLogoCentered:
        this.state.isLogoCentered === "uncenterLogo"
          ? "centerLogo"
          : "uncenterLogo",
    });
    console.log(this.state.isLogoCentered);
  }

  changeHandler = (selected) => {
    this.props.onFilterChange(selected);
  };

  render() {
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="secondary"
          className="navbar-custom flex-direction-column text-light"
        >
          <Navbar.Brand
            href=""
            className={`${this.state.isLogoCentered} toggeled-logo`}
          >
            <Link to="/" className="text-light h3 font-weight-bold logo">
              <p class="text-decoration-none my-auto">MedHelper</p>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsible-navbar-nav"
            onClick={() => this.animateLogo()}
            on
          />
          <Navbar.Collapse className="responsible-navbar-nav w-100">
            <MedCardFilters
              data={this.props.filters}
              onChange={this.changeHandler}
            />
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
