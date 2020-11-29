import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function Assignment(props) {
  return (
    <Card className="mx-4 my-5 text-left shadow-sm animate__animated animate__backInRight">
      <Card.Body>
        <Card.Title>
          <p class="h3">{props.assignment.name}</p>
        </Card.Title>
        <Card.Text className="mt-2">{props.assignment.text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Container fluid className="m-0">
          <Row className="child-center">
            <Col className="px-1">
              <div class="text-left ">{props.assignment.specification}</div>
            </Col>
            <Col className="px-1">
              <div class="text-right ">
                {props.assignment.date} <br />
                {props.assignment.creator}
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
