import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "../../../components/Main/Base";
import axiosInstance from "../../../axiosApi";
import { BaseBar } from "../../../components/Main/BaseBar";
import { Loading } from "../../../components/Main/loading";

export class TagEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      data: {},
      loading: true,
    };
  }

  async getTag() {
    let response = await axiosInstance.get(`assignment/tag/${this.state.id}`);
    const tag = response.data;
    const state = this.state;
    state.data = tag;
    state.loading = false;
    this.setState(state);
    return tag;
  }

  componentDidMount() {
    this.getTag();
  }

  onChange(e) {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({
      ...this.state.data,
      data: data,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const data = this.state.data;

    try {
      let response = await axiosInstance.put(
        `/assignment/tag/update/${data.id}`,
        data
      );
      if (response.status >= 200 && response.status < 300) {
        this.props.history.push("/tag");
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
                    <p className="h2 text-center m-4">Edit Tag</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form
                      method="POST"
                      onSubmit={(e) => {
                        this.handleSubmit(e);
                      }}
                      className="mt-4 "
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
                          type="text"
                          placeholder="Tag name"
                          name="name"
                          defaultValue={this.state.data.name}
                          onChange={(e) => this.onChange(e)}
                          required
                        />
                      </InputGroup>

                      <Row>
                        <Col>
                          <Link to={`/tag`}>
                            <Button
                              variant="info"
                              type="button"
                              className="w-100 mt-5 mb-1 font-weight-bold w-100 p-3 mx-auto btn-left"
                            >
                              Cancel
                            </Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="success"
                            type="submit"
                            className="w-100 mt-5 mb-1 font-weight-bold w-100 p-3 mx-auto btn-right"
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
