import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import OptionDropdown from "./optionButton";
import axiosInstance from "../../axiosApi";

export async function deleteAssignment(id) {
  if (confirm(`Do you really want to delete assignment with name ${id}?`)) {
    try {
      let response = await axiosInstance.delete(`assignment/delete/${id}`);
      if (response.status >= 200 && response.status < 300) {
        window.location.href = "/medical_card";
      }
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }
}

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export class Assignment extends React.Component {
  manageTextLenght = (text) => {
    return text.length < 700 ? text : `${text.slice(0, 700 - 5)}...`;
  };

  render() {
    return (
      <Card className="mx-4 my-5 text-left shadow-sm animate__animated animate__backInRight faster rounded-custom">
        <Card.Body>
          <Card.Title>
            <Link
              to={`/assignment/${this.props.assignment.id}`}
              className="text-decoration-none text-dark"
            >
              <p className="h3 d-inline-block">{this.props.assignment.name}</p>
            </Link>
            <OptionDropdown className="dropdown-wrapper">
              <Link
                to={`/assignment/${this.props.assignment.id}/edit`}
                className="dropdown-item"
              >
                Edit
              </Link>
              <a
                className="dropdown-item"
                onClick={() => {
                  deleteAssignment(this.props.assignment.id), this.props;
                }}
              >
                Delete
              </a>
            </OptionDropdown>
          </Card.Title>
          <div className="assignment-text z-index-text">
            <Card.Text className="mt-2">
              {this.manageTextLenght(this.props.assignment.text)}
            </Card.Text>
          </div>
        </Card.Body>
        <Card.Footer className="rounded-bottom-custom">
          <Container fluid className="m-0">
            <Row className="child-center">
              <Col className="px-1">
                <div className="text-left ">
                  {this.props.assignment.specification}
                </div>
              </Col>
              <Col className="px-1">
                <div className="text-right ">
                  {formatDate(new Date(this.props.assignment.create_date))}
                  <br />
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
