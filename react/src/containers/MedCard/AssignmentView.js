import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../../components/Main/Base";
import { Loading } from "../../components/loading";
import {
  deleteAssignment,
  formatDate,
} from "../../components/MedCard/Assignment";
import axiosInstance from "../../axiosApi";
import { BaseBar } from "../../components/Main/BaseBar";

export default class MedCardAssignment extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      id: props.match.params.id,
      loading: true,
    };
  }

  async getAssignment() {
    try {
      let response = await axiosInstance.get(`/assignment/${this.state.id}`);
      const data = response.data;

      this.setState({ assignment: data, loading: false });
      return data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  componentDidMount() {
    this.getAssignment();
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <>
        <Base
          sidebar={<BaseBar />}
          main={
            <Container className="addassignmnet-container p-4">
              <div className="w-100 p-4 bg-light rounded-custom border-custom">
                <Row>
                  <Col>
                    <p className="h2 text-center my-4">
                      {this.state.assignment.name}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="text-left text-seconady mt-2">
                      Specification: {this.state.assignment.specification.name}
                    </div>

                    <div className="text-left text-seconady">
                      Creator: {this.state.assignment.creator.email}
                    </div>

                    <div className="text-left text-seconady">
                      Date of creation:{" "}
                      {new Date(this.state.assignment.create_date)
                        .toString()
                        .slice(0, 25)}
                    </div>
                  </Col>
                  <Col className="text-align-screen" md={6}>
                    {this.state.assignment.editor != null ? (
                      <>
                        <div className="text-seconady">
                          Editor: {this.state.assignment.editor.email}
                        </div>

                        <div className="text-seconady">
                          Date of editing:{" "}
                          {new Date(this.state.assignment.editing_date)
                            .toString()
                            .slice(0, 25)}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="h5 mt-5  mb-4 text-justify">
                      {this.state.assignment.text}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="h5 mt-5  mb-4 text-justify">Files:</p>
                    {this.state.assignment.data.data.files.length < 1 ? (
                      <p className="">No files</p>
                    ) : (
                      this.state.assignment.data.data.files.map((file) => {
                        return (
                          <Link
                            to={`/files/${id}/${file}`}
                            className="text-decoration-none"
                          >
                            <div className="file-assignment-view bg-gray my-4 p-3 pl-4 text-dark">
                              <p className="m-0">{file}</p>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="pr-1">
                    <Button
                      variant="info"
                      type="submit"
                      className="w-100 mt-3 mb-1 font-weight-bold w-100 p-3 mx-auto btn-left"
                      onClick={() => {
                        deleteAssignment(this.state.assignment.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col className="pl-1">
                    <Link
                      to={`/assignment/${this.state.assignment.id}/edit`}
                      className="text-decoration-none text-dark "
                    >
                      <Button
                        variant="success"
                        type="submit"
                        className="w-100 mt-3 mb-1 font-weight-bold w-100 p-3  mx-auto btn-right"
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
