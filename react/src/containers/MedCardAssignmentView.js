import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../components/Base";
import { deleteAssignment } from "../components/Assignment";

const server = {
  assignment: {
    id: 0,
    name: "Name",
    specification: "specification",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date_of_creation: "01-12-2020",
    creator: "Name Surame",
    files: ["file1", "file2"],
    date_of_editing: "10-12-2020",
    editor: "Name1 Surname",
  },
};

const id = 0;

export default class MedCardAssignment extends React.Component {
  render() {
    return (
      <>
        <Base
          sidebar={
            <Link
              to={`/${id}/medical_card`}
              className="text-light h5 font-weight-bold mx-auto"
            >
              <p class="text-decoration-none my-auto">MedCard</p>
            </Link>
          }
          main={
            <Container className="addassignmnet-container p-4">
              <div className="w-100">
                <Row>
                  <Col>
                    <p className="h2 text-center my-4">
                      {server.assignment.name}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div class="text-left text-seconady mt-2">
                      Specification: {server.assignment.specification}
                    </div>

                    <div class="text-left text-seconady">
                      Creator: {server.assignment.creator}
                    </div>

                    <div class="text-left text-seconady">
                      Date of creation: {server.assignment.date_of_creation}
                    </div>
                  </Col>
                  <Col className="text-align-screen" md={6}>
                    <div class="text-seconady">
                      Editor: {server.assignment.editor}
                    </div>

                    <div class="text-seconady">
                      Date of editing: {server.assignment.date_of_editing}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="h5 mt-5  mb-4 text-justify">
                      {server.assignment.text}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="h5 mt-5  mb-4 text-justify">Files:</p>
                    {server.assignment.files.map((file) => {
                      return (
                        <Link
                          to={`/files/${id}/${file}`}
                          className="text-decoration-none"
                        >
                          <div className="file-assignment-view bg-gray my-4 p-3 pl-4 text-dark">
                            <p class="m-0">{file}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Link to={`/${id}/medical_card`}>
                      <Button
                        variant="info"
                        type="submit"
                        className="w-100 my-5 font-weight-bold w-100 p-3 mx-auto"
                        onClick={() => {
                          deleteAssignment(server.assignment.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to={`/assignment/${server.assignment.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <Button
                        variant="success"
                        type="submit"
                        className="w-100 my-5 font-weight-bold w-100 p-3 mx-auto "
                      >
                        Edit
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Container>
          }
        />
      </>
    );
  }
}
