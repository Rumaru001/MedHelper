import React from "react";
import { Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


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
  }


  render() {
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="secondary"
          className="overflow-auto disable-scrollbars navbar-custom flex-direction-column text-light"
        >
          <Navbar.Brand
            href=""
            className={`${this.state.isLogoCentered} toggeled-logo`}
          >
            <Link to="/" className="text-light h3 font-weight-bold logo">
              <p className="text-decoration-none my-auto">MedHelper</p>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsible-navbar-nav"
            onClick={() => this.animateLogo()}
          />
          <Navbar.Collapse className="responsible-navbar-nav w-100">
            {this.props.children}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
