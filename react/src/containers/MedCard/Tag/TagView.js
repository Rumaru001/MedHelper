import React from "react";
import Base from "../../../components/Main/Base";
import axiosInstance from "../../../axiosApi";
import { Link } from "react-router-dom";
import { AddButton } from "../../../components/MedCard/AddButton";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { BaseBar } from "../../../components/Main/BaseBar";
import { Loading } from "../../../components/loading";

export class TagList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async getTags() {
    try {
      let response_tags = await axiosInstance.get(`assignment/tag`);
      const tags = response_tags.data;
      this.setState({
        tags: tags,
        loading: false,
      });
      return tags;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  async deleteTag(id, name) {
    if (confirm(`Do you really want to delete tag: ${name}?`)) {
      try {
        let response = await axiosInstance.delete(
          `assignment/tag/delete/${id}`
        );
        if (response.status >= 200 && response.status < 300) {
          window.location.href = "/tag";
        }
      } catch (error) {
        console.log("Error: ", JSON.stringify(error, null, 4));
        throw error;
      }
    }
  }

  componentDidMount() {
    console.log(this.getTags());
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <>
        <Base
          sidebar={
            <BaseBar>
              <AddButton to="/tag/add" className="addbtn-assignment text-light">
                <p className="text-center my-auto">+ Add Tag</p>
              </AddButton>
            </BaseBar>
          }
          main={
            <>
              <p className="h1 m-4 mt-5 text-center">Tags</p>
              {this.state.tags.length > 0 ? (
                this.state.tags.map((tag, i) => {
                  return (
                    <Card
                      key={i}
                      className="mx-4 my-5 text-left shadow-sm animate__animated animate__backInRight faster rounded-custom"
                    >
                      <Card.Body>
                        <Card.Title className="m-0">
                          <p className="h3 d-inline-block m-2 mb-0">
                            {tag.name}
                          </p>
                        </Card.Title>
                      </Card.Body>
                      <Card.Footer>
                        <Container fluid className="m-0">
                          <Row className="child-center">
                            <Col className="px-1">
                              <Link
                                to={`/tag/edit/${tag.id}`}
                                className="child-center"
                              >
                                <Button
                                  variant="success"
                                  type="button"
                                  className="w-100 mx-auto btn-left btn-margin"
                                >
                                  Edit
                                </Button>
                              </Link>
                            </Col>
                            <Col className="px-1">
                              <a
                                className="child-center"
                                onClick={() => {
                                  this.deleteTag(tag.id, tag.name);
                                }}
                              >
                                <Button
                                  variant="danger"
                                  type="button"
                                  className="w-100 mx-auto btn-right btn-margin"
                                >
                                  Delete
                                </Button>
                              </a>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Footer>
                    </Card>
                  );
                })
              ) : (
                <p className="h4 mt-5 pt-4 text-secondary text-center">
                  No tags found 🙁
                </p>
              )}
            </>
          }
        />
      </>
    );
  }
}
