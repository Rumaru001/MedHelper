import React, { Component } from "react";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "../PersonalAccount/styles.css";

export async function handleLogout() {
  try {
    const response = await axiosInstance.post("auth/logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    window.location.href = "/";
    return response;
  } catch (e) {
    console.log(e);
  }
}

export class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    handleLogout = handleLogout.bind(this);
  }

  render() {
    return (
      <Container
        className={`d-flex justify-content-center child-center child-center ${this.props.className}`}
      >
        <div className="w-75">
          <Button className="w-100 btn-med_card" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {/*<Link to={`/hello/`}>Hello</Link>*/}
      </Container>
    );
  }
}
