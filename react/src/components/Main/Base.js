import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SideNavBar } from "./SideBar.js";
import Access from "./Access";
import jwtDecode from "jwt-decode";

const getUserRole = () => {
  var token = localStorage.getItem("access_token");
  var decoded = jwtDecode(token);
  return decoded["user_type"];
};

export default class Base extends React.Component {
  render() {
    return (
      <Access
        role={getUserRole()}
        action={window.location.pathname}
        yes={() => {
          return (
            <>
              <SideNavBar>{this.props.sidebar}</SideNavBar>

              <Container fluid className="vh-100-c">
                <Row>
                  <Col xs={3} id="sidebar-wrapper"></Col>
                  <Col
                    xs={9}
                    id="page-content-wrapper"
                    className="vh-100-c page-back"
                  >
                    <div>{this.props.main}</div>
                  </Col>
                </Row>
              </Container>
            </>
          );
        }}
      />
    );
  }
}
