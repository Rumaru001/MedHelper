import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SideNavBar } from "./SideBar.js";

export default class Base extends React.Component {
  render() {
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
  }
}
