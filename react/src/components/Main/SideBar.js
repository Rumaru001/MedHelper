import React from "react";
import { Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logout } from "../Auth/Logout";

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
          className="overflow-auto disable-scrollbars navbar-custom flex-direction-column text-light bg-custom"
        >
          <Navbar.Brand
            href=""
            className={`${this.state.isLogoCentered} toggeled-logo`}
          >
            <Link
              to="/personal_account/"
              className="text-light h3 font-weight-bold logo"
            >
              <Row>
                <img
                  title="Profile photo"
                  alt="Profile photo"
                  style={{ width: "80px", height: "80px" }}
                  src={
                    "https://www.flaticon.com/svg/static/icons/svg/1405/1405870.svg"
                  }
                />
                <p className="ml-3 text-decoration-none my-auto">MedHelper</p>
              </Row>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsible-navbar-nav"
            onClick={() => this.animateLogo()}
          />
          <Navbar.Collapse className="responsible-navbar-nav w-100">
            {/*<div className="w-100 h-100 flex-column">
                            {this.props.children}
                            <Logout children={this.props.children} className="my-4"/>
                        </div>*/}
            {window.location.href ===
            "http://localhost:3000/personal_account/" ? (
              <div className="w-100 h-100 flex-column">
                {this.props.children}
              </div>
            ) : (
              <div className="w-100 h-100 flex-column">
                <div className="max-free-height">{this.props.children}</div>
                <Logout children={this.props.children} className="my-4" />
              </div>
            )}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
