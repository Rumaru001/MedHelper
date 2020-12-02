import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import OptionDropdown from "../components/optionButton";

const options = [
  { link: "/assignment/", name: "" },
  { link: "", name: "" },
];

export default class Assignment extends React.Component {
  manageTextLenght = (text) => {
    return text.length < 700 ? text : `${text.slice(0, 700 - 5)}...`;
  };

  render() {
    return (
      <Card className="mx-4 my-5 text-left shadow-sm animate__animated animate__backInRight">
        <Card.Body>
          <Link
            to={`/assignment/${this.props.assignment.id}`}
            className="text-decoration-none text-dark"
          >
            <Card.Title>
              <p class="h3 d-inline-block">{this.props.assignment.name}</p>

              <OptionDropdown className="dropdown-wrapper">
                <Link
                  to={`/assignment/${this.props.assignment.id}/edit`}
                  className="dropdown-item"
                >
                  Edit
                </Link>
                <Link
                  to={`/assignment/${this.props.assignment.id}/delete`}
                  className="dropdown-item"
                >
                  Delete
                </Link>
              </OptionDropdown>
            </Card.Title>
          </Link>
          <div class="assignment-text">
            <Card.Text className="mt-2">
              {this.manageTextLenght(this.props.assignment.text)}
            </Card.Text>
          </div>
        </Card.Body>
        <Card.Footer>
          <Container fluid className="m-0">
            <Row className="child-center">
              <Col className="px-1">
                <div class="text-left ">
                  {this.props.assignment.specification}
                </div>
              </Col>
              <Col className="px-1">
                <div class="text-right ">
                  {this.props.assignment.date} <br />
                  {this.props.assignment.creator}
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    );
  }
}
