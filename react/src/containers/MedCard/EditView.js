import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../../components/Main/Base";
import axiosInstance from "../../axiosApi";
import { BaseBar } from "../../components/Main/BaseBar";
import { Loading } from "../../components/Main/loading";

export default class MedCardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      extraData: {},
      id: props.match.params.id,
      loading: true,
    };
  }

  onChange(e, filed = "data") {
    const data = this.state[filed];
    data[e.target.name] = e.target.value;
    this.setState({
      ...this.state.data,
      [filed]: data,
    });
    console.log(this.state);
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const data = this.state.data;
    data.data = this.state.extraData;
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
        extraData: assignment.data.data,
        data: {
          specification: assignment.specification.id,
        },
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

  render() {
    return this.state.loading ? (
      <Loading />
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
                          className="h-auto"
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
                          className="h-auto"
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
                          className="h-auto"
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

                      {this.state.data.specification == "5" ? (
                        <>
                          <InputGroup className="mb-3 ">
                            <InputGroup.Prepend className="w-25 text-center">
                              <InputGroup.Text
                                id="ChestPain"
                                className="nowrap child-center btn-settings-nonChange"
                              >
                                <p className="m-0">Chest pain type</p>
                              </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                              className="h-auto"
                              as="select"
                              onChange={(e) => this.onChange(e, "extraData")}
                              defaultValue={this.state.extraData.cp}
                              name="cp"
                            >
                              <option>typical angina</option>
                              <option> atypical angina</option>
                              <option> non-anginal pain</option>
                              <option>asymptomatic</option>
                            </Form.Control>
                          </InputGroup>

                          <InputGroup className="mb-3 ">
                            <InputGroup.Prepend className="w-25 text-center">
                              <InputGroup.Text
                                id="Angina"
                                className="nowrap child-center btn-settings-nonChange"
                              >
                                <p className="m-0">Exercise induced angina?</p>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <div className="form-control h-auto child-center">
                              <div className="w-50 child-center">
                                <Form.Check
                                  type="radio"
                                  name="exang"
                                  id="exang-no"
                                  value="0"
                                  label="No"
                                  onChange={(e) =>
                                    this.onChange(e, "extraData")
                                  }
                                  defaultChecked={
                                    this.state.extraData.exang == 0
                                  }
                                />
                              </div>
                              <div className="w-50 child-center">
                                <Form.Check
                                  type="radio"
                                  name="exang"
                                  id="exang-yes"
                                  value="1"
                                  onChange={(e) =>
                                    this.onChange(e, "extraData")
                                  }
                                  defaultChecked={
                                    this.state.extraData.exang == 1
                                  }
                                  label="Yes"
                                />
                              </div>
                            </div>
                          </InputGroup>

                          <InputGroup className="mb-3 ">
                            <InputGroup.Prepend className="w-25 text-center">
                              <InputGroup.Text
                                id="MaxRate"
                                className="nowrap child-center btn-settings-nonChange"
                              >
                                <p className="m-0">
                                  Maximum heart rate achieved{" "}
                                </p>
                              </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                              className="h-auto"
                              name="thalach"
                              onChange={(e) => this.onChange(e, "extraData")}
                              type="number"
                              defaultValue={this.state.extraData.thalach}
                              maxLength="400"
                            />
                          </InputGroup>
                        </>
                      ) : (
                        " "
                      )}

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
                          className="h-auto"
                          as="textarea"
                          rows={this.state.assignment.text.length / 50}
                          onChange={(e) => this.onChange(e)}
                          required
                          name="text"
                          placeholder="Enter description on assignment"
                          defaultValue={this.state.assignment.text}
                        />
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
