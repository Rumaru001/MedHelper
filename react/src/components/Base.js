import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SideNavBar } from "../components/SideBar.js";

export default function Base(props) {
  return (
    <>
      <SideNavBar>{props.sidebar}</SideNavBar>
      <Container fluid className="vh-100-c">
        <Row>
          <Col xs={3} id="sidebar-wrapper"></Col>
          <Col xs={9} id="page-content-wrapper" className="vh-100-c">
            {props.main}
          </Col>
        </Row>
      </Container>
    </>
  );
}
