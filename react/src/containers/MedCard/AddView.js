import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../../components/Main/Base";
import axiosInstance from "../../axiosApi";
import { BaseBar } from "../../components/Main/BaseBar";
import { Loading } from "../../components/Main/loading";
import { getUserRole } from "../../App";
import { links } from "../../components/Main/Links";

export default class MedCardAdd extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      extraData: {},
      loading: true,
      user_role: getUserRole(),
    };
  }

  async getData() {
    try {
      let response_specs = await axiosInstance.get(`assignment/specification`);
      const specs = response_specs.data;
      let response_tags = await axiosInstance.get(`assignment/tag`);
      const tags = response_tags.data;
      this.setState({
        data: {},
        extraData: {
          cp: "asymptomatic",
        },
        specifications: specs,
        tags: tags,
        loading: false,
        errors: [],
      });
      return [specs, tags];
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  componentDidMount() {
    this.getData();
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
    // console.log(this.state);
    const data = this.state.data;
    console.log(this.props);
    const user_id = this.props.location.state?.user_id;
    if (user_id !== undefined) {
      data.user_id = user_id;
    }
    console.log(data);
    data.data = this.state.extraData;

    try {
      let response = await axiosInstance.post("/assignment/create", data);
      if (response.status >= 200 && response.status < 300) {
        this.props.history.push(
          this.state.user_role == 1 ? links.medical_card : links.patients
        );
      }
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
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
                    <p className="h2 text-center m-4">New Assignment</p>
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
                            className="nowrap child-center"
                          >
                            <p className="m-0">Title</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          className="h-auto"
                          type="text"
                          placeholder="Name of assignment"
                          name="name"
                          onChange={(e) => this.onChange(e)}
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

                        <Form.Control
                          className="h-auto"
                          as="select"
                          name="specification"
                          onChange={(e) => this.onChange(e)}
                          defaultValue=""
                          required
                        >
                          <option value="" disabled hidden>
                            Choose here
                          </option>
                          {this.state.specifications.map((element, index) => {
                            return (
                              <option key={index} value={element.id}>
                                {element.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </InputGroup>

                      {this.state.user_role == 1 ? (
                        <InputGroup className="mb-3 ">
                          <InputGroup.Prepend className="w-25 text-center">
                            <InputGroup.Text
                              id="SpecAssignment"
                              className="nowrap child-center"
                            >
                              <p className="m-0">Tag</p>
                            </InputGroup.Text>
                          </InputGroup.Prepend>

                          <Form.Control
                            className="h-auto"
                            as="select"
                            onChange={(e) => this.onChange(e)}
                            defaultValue=""
                            name="tag"
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
                      ) : (
                        ""
                      )}

                      {this.state.data.specification == "5" ? (
                        <>
                          <InputGroup className="mb-3 ">
                            <InputGroup.Prepend className="w-25 text-center">
                              <InputGroup.Text
                                id="ChestPain"
                                className="nowrap child-center"
                              >
                                <p className="m-0">Chest pain type</p>
                              </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                              className="h-auto"
                              as="select"
                              onChange={(e) => this.onChange(e, "extraData")}
                              defaultValue="asymptomatic"
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
                                className="nowrap child-center"
                              >
                                <p className="m-0">Exercise induced angina?</p>
                              </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Check
                              type="radio"
                              name="exang"
                              id="exang-no"
                              value="0"
                              label="No"
                              onChange={(e) => this.onChange(e, "extraData")}
                            />
                            <Form.Check
                              type="radio"
                              name="exang"
                              id="exang-yes"
                              value="1"
                              onChange={(e) => this.onChange(e, "extraData")}
                              label="Yes"
                            />
                          </InputGroup>

                          <InputGroup className="mb-3 ">
                            <InputGroup.Prepend className="w-25 text-center">
                              <InputGroup.Text
                                id="MaxRate"
                                className="nowrap child-center"
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
                            className="nowrap child-center"
                          >
                            <p className="m-0">Text of assignment</p>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          className="h-auto"
                          as="textarea"
                          rows={3}
                          name="text"
                          onChange={(e) => this.onChange(e)}
                          required
                          placeholder="Enter description on assignment"
                        />
                      </InputGroup>

                      <Row>
                        <Col>
                          <Link to={`/medical_card`}>
                            <Button
                              variant="info"
                              type="button"
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
