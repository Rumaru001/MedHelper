import React from "react";
import { Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MedCardFilters } from "./MedCardFilters.js";
import { AddButton } from "../components/AddButton";
import { DatePicker } from "../components/DatePicker";

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

  changeHandler = (selected) => {
    this.props.onFilterChange(selected);
  };

  timeChangeHandler = (key, time) => {
    this.props.onDateFilterChange({ [key]: time });
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
          />
          <Navbar.Collapse className="responsible-navbar-nav w-100">
            <div class="container h-100 py-4">
              <div className="w-100">
                <div class="w-75 mx-auto d-flex">
                  <div class="container m-0 p-0">
                    <Row className="w-100 m-0">
                      <Col className="mb-2 p-0">
                        <DatePicker
                          placeholder="Start date"
                          label="From"
                          className="w-100"
                          onChange={this.timeChangeHandler}
                          keyFiled="startTime"
                          default="1900-01-01"
                        />
                      </Col>
                    </Row>
                    <Row className="w-100 m-0 pt-2">
                      <Col className="mb-2 p-0">
                        <DatePicker
                          placeholder="End date"
                          label="Till"
                          className="w-100"
                          onChange={this.timeChangeHandler}
                          keyFiled="endTime"
                          default={new Date()}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <MedCardFilters
                  data={this.props.filters}
                  onChange={this.changeHandler}
                />
              </div>

              <AddButton
                to="/assignment/add"
                className="addbtn-assignment text-light"
              >
                <p class="text-center my-auto">+ Add Assignment</p>
              </AddButton>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
