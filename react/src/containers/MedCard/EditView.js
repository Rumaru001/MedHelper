import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../../components/Main/Base";

const server = {
  errors: [],
  specifications: ["specification", "specification1"],
  fileCounter: 1,
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

export default class MedCardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...server, file_value: "" };
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
      file_value:
        files.length == 1
          ? files[0].name
          : files.length < 1
          ? "Choose files..."
          : `${files.length} files selected`,
    });
  };

  deleteFile = (index) => {
    if (
      confirm(
        `Are you sure that you want to delete ${this.state.assignment.files[index]}?`
      )
    ) {
      console.log(this.state);
      const assignment = { ...this.state.assignment };
      assignment.files.splice(index, 1);
      this.setState(
        {
          ...this.state,
          assignment: assignment,
        },
        () => {
          console.log(this.state);
        }
      );
    }
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
                    <p className="h2 text-center m-4">Edit Assignment</p>
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
                            <p className="m-0">Name</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          type="text"
                          placeholder="Name of assignment"
                          required
                          defaultValue={this.state.assignment.name}
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

                        <Form.Control
                          as="select"
                          required
                          defaultValue={this.state.assignment.specification}
                        >
                          {this.state.specifications.forEach((element) => {
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
                          rows={this.state.assignment.text.length / 50}
                          required
                          placeholder="Enter description on assignment"
                          defaultValue={this.state.assignment.text}
                        />
                      </InputGroup>

                      <p className="h5 mt-5  mb-4 text-justify">Files:</p>
                      {this.state.assignment.files.map((file, index) => {
                        return (
                          <div key={index} className="file-assignment-view bg-gray my-4 p-3 pl-4 text-dark d-flex child-center">
                            <Link
                              to={`/files/${id}/${file}`}
                              className="text-decoration-none w-50"
                            >
                              <p className="m-0 text-dark">{file}</p>
                            </Link>

                            <Button
                              variant="danger"
                              type="button"
                              className="ml-auto"
                              onClick={() => {
                                this.deleteFile(index);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        );
                      })}

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
                            defaultValue={this.state.file_value}
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
                            Save
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
