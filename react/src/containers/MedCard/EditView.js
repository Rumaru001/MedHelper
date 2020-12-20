import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../../components/Main/Base";
import axiosInstance from "../../axiosApi";
import { BaseBar } from "../../components/Main/BaseBar";
import { Loading } from "../../components/loading";



export default class MedCardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: props.match.params.id,
      loading: true,
    };
  }

  onChange(e) {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState(
      {
        ...this.state.data,
        data: data,
      },
      console.log(this.state)
    );
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const data = this.state.data;
    data.data = {
      files: this.state.files !== "Choose files" ? this.state.files : [],
    };
    console.log(data);
    try {
      let response = await axiosInstance.put(
        `/assignment/update/${this.state.id}`,
        data
      );
      if (response.status >= 200 && response.status < 300) {
        this.props.history.push("/medical_card");
      }
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  async getData() {
    try {
      let response_specs = await axiosInstance.get(`assignment/specification`);
      const specs = response_specs.data;
      let response_tags = await axiosInstance.get(`assignment/tag`);
      const tags = response_tags.data;
      let response_assignment = await axiosInstance.get(
        `assignment/${this.state.id}`
      );
      const assignment = response_assignment.data;
      console.log(assignment);
      this.setState({
        ...this.state,
        assignment: assignment,
        files: "Choose files",
        specifications: specs,
        tags: tags,
        loading: false,
        errors: [],
      });
      return [specs, tags, assignment];
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  componentDidMount() {
    this.getData();
  }

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
    return this.state.loading ? (
      <Loading/>
    ) : (
      <>
        <Base
          sidebar={<BaseBar />}
          main={
            <Container className="vh-100-c addassignmnet-container p-4">
              <div className="w-100 p-4 bg-light rounded-custom border-custom">
                <Row>
                  <Col>
                    <p className="h2 text-center m-4">Edit Assignment</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form
                      method="POST"
                      onSubmit={(e) => {
                        this.handleSubmit(e);
                      }}
                      className="mt-4"
                    >
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="TitleAssignment"
                            className="nowrap child-center btn-settings-nonChange"
                          >
                            <p className="m-0">Name</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          type="text"
                          placeholder="Name of assignment"
                          name="name"
                          required
                          defaultValue={this.state.assignment.name}
                          onChange={(e) => this.onChange(e)}
                        />
                      </InputGroup>

                      <InputGroup className="mb-3 ">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="SpecAssignment"
                            className="nowrap child-center btn-settings-nonChange"
                          >
                            <p className="m-0">Specification</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          as="select"
                          required
                          name="specification"
                          onChange={(e) => this.onChange(e)}
                          defaultValue={this.state.assignment.specification.id}
                        >
                          {this.state.specifications.map((element, index) => {
                            return (
                              <option key={index} value={element.id}>
                                {element.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </InputGroup>

                      <InputGroup className="mb-3 ">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="SpecAssignment"
                            className="nowrap child-center btn-settings-nonChange"
                          >
                            <p className="m-0">Tag</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          as="select"
                          onChange={(e) => this.onChange(e)}
                          name="tag"
                          defaultValue={
                            this.state.assignment.tag != null
                              ? this.state.assignment.tag.id
                              : ""
                          }
                        >
                          <option value="">Choose here</option>
                          {this.state.tags.map((element, index) => {
                            return (
                              <option key={index} value={element.id}>
                                {element.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="textAssignment"
                            className="nowrap child-center btn-settings-nonChange"
                          >
                            <p className="m-0">Text of assignment</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          as="textarea"
                          rows={this.state.assignment.text.length / 50}
                          onChange={(e) => this.onChange(e)}
                          required
                          name="text"
                          placeholder="Enter description on assignment"
                          defaultValue={this.state.assignment.text}
                        />
                      </InputGroup>

                      <p className="h5 mt-5  mb-4 text-justify">Files:</p>
                      {this.state.assignment.data.data.files.map(
                        (file, index) => {
                          return (
                            <div className="file-assignment-view bg-gray my-4 p-3 pl-4 text-dark d-flex child-center">
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
                        }
                      )}

                      <InputGroup className="mb-3">
                        <InputGroup.Prepend className="w-25 text-center">
                          <InputGroup.Text
                            id="file-prepend"
                            className="nowrap child-center btn-settings-nonChange"
                          >
                            <p className="m-0">Upload files</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <div className="custom-file hover_effect">
                          <Form.File
                            className="position-relative custom-file-input"
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
                          <Link to={`/medical_card`}>
                            <Button
                              variant="info"
                              type="submit"
                              className="w-100 mt-5 font-weight-bold w-100 p-3 mx-auto btn-left"
                            >
                              Cancel
                            </Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="success"
                            type="submit"
                            className="w-100 mt-5 font-weight-bold w-100 p-3 mx-auto btn-right"
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
