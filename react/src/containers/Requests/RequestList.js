import React from "react";
import axiosInstance from "../../axiosApi";
import Base from "../../components/Main/Base";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { BaseBar } from "../../components/Main/BaseBar";
import { Loading } from "../../components/Main/loading";

export default class RequestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async getData() {
    try {
      let response = await axiosInstance.get(`request/`);
      const data = response.data;
      this.setState({
        requests: data,
        loading: false,
      });
      return data;
    } catch (error) {
      console.log("datail: ", error.response.data);
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  async handleRequest(id, answer) {
    try {
      let response = await axiosInstance.put(`request/${id}/`, {
        answer: answer,
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
    this.getData();
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
          sidebar={<BaseBar></BaseBar>}
          main={
            <>
              <p className="h1 m-4 mt-5 text-center">Requests</p>
              {this.state.requests.length > 0 ? (
                this.state.requests.map((request, i) => {
                  return (
                    <Card
                      key={i}
                      className="mx-4 my-5 text-left shadow-sm animate__animated animate__backInRight faster rounded-custom"
                    >
                      <Card.Body>
                        <Card.Title className="m-0">
                          <p className="h3 d-inline-block m-2 mb-0">
                            {request.description}
                          </p>
                        </Card.Title>
                      </Card.Body>
                      <Card.Footer>
                        <Container fluid className="m-0">
                          <Row className="child-center">
                            <Col className="px-1">
                              <Button
                                variant="danger"
                                type="button"
                                className="w-100 mx-auto btn-left btn-margin"
                                onClick={() => {
                                  this.handleRequest(request.id, false);
                                }}
                              >
                                Reject
                              </Button>
                            </Col>
                            <Col className="px-1">
                              <Button
                                variant="success"
                                type="button"
                                className="w-100 mx-auto btn-right btn-margin"
                                onClick={() => {
                                  this.handleRequest(request.id, true);
                                }}
                              >
                                Accept
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Footer>
                    </Card>
                  );
                })
              ) : (
                <p className="h4 mt-5 pt-4 text-secondary text-center">
                  No requests found !
                </p>
              )}
            </>
          }
        />
      </>
    );
  }
}
