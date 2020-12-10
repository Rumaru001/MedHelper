import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../../components/Main/Base";

const server = {
  errors: [],
  specifications: [],
  fileCounter: 1,
};

const id = 0;

export default class MedCardAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: "Choose files",
    };
  }
  handleChange = () => {
    return;
  };
  handleSubmit = () => {
    return;
  };

  handleFileChange = (e) => {
    var files = e.target.files;
    this.setState({
      ...this.state,
      files:
        files.length == 1
          ? files[0].name
          : files.length < 1
          ? "Choose files..."
          : `${files.length} files selected`,
    });
  };

  render() {
    return (
      <>
        <Base
          sidebar={
            <Link
              to={`/${id}/medical_card`}
              className="text-light h5 font-weight-bold mx-auto"
            >
              <p className="text-decoration-none my-auto">MedCard</p>
            </Link>
          }
          main={
            <Container className="vh-100-c addassignmnet-container p-4">
              <div className="w-100">
                <Row>
                  <Col>
                    <p className="h2 text-center m-4">New Assignment</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form
                      noValidate
                      onSubmit={this.handleSubmit}
                      className="my-4"
                    >
                      <Form.Control.Feedback type="invalid" tooltip>
                        {server.errors.state}
                      </Form.Control.Feedback>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="TitleAssignment"
                            className="nowrap child-center"
                          >
                            <p className="m-0">Title</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          type="text"
                          placeholder="Name of assignment"
                          required
                        />
                      </InputGroup>

                      <InputGroup className="mb-3 ">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="SpecAssignment"
                            className="nowrap child-center"
                          >
                            <p className="m-0">Specification</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control as="select" required>
                          {server.specifications.forEach((element) => {
                            <option>{element}</option>;
                          })}
                        </Form.Control>
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="textAssignment"
                            className="nowrap child-center"
                          >
                            <p className="m-0">Text of assignment</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          as="textarea"
                          rows={3}
                          required
                          placeholder="Enter description on assignment"
                        />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="file-prepend"
                            className="nowrap child-center"
                          >
                            <p className="m-0">Upload files</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <div className="custom-file hover_effect">
                          <Form.File
                            className="position-relative custom-file-input"
                            required
                            name="files"
                            id="files"
                            onChange={(e) => this.handleFileChange(e)}
                            aria-describedby="file-prepend"
                            multiple
                          />
                          <label
                            className="custom-file-label text-secondary"
                            htmlFor="files"
                          >
                            {this.state.files}
                          </label>
                        </div>
                      </InputGroup>

                      <Row>
                        <Col>
                          <Link to={`/${id}/medical_card`}>
                            <Button
                              variant="info"
                              type="submit"
                              className="w-100 my-5 font-weight-bold w-100 p-3 mx-auto "
                            >
                              Cancel
                            </Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="success"
                            type="submit"
                            className="w-100 my-5 font-weight-bold w-100 p-3 mx-auto "
                          >
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </Form>
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
