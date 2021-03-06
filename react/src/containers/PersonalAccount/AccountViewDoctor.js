import React from "react";
import Base from "../../components/Main/Base";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../axiosApi";
import { PersonalAccountSideBar } from "../../components/PersonalAccount/PersonalSideBar";
import "../../components/PersonalAccount/styles.css";
import { Loading } from "../../components/Main/loading";
import { handleLogout, Logout } from "../../components/Auth/Logout";
import Pluralize from "pluralize";
import { links } from "../../components/Main/Links";
import { getUserRole } from "../../App";

export default class PersonalAccountDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async getData() {
    try {
      console.log(localStorage);

      let response = await axiosInstance.get("auth/users/doctor/");
      const data = response.data;
      let response_message = await axiosInstance.get("messages/");
      const data_messages = response_message.data;
      this.setState({
        profile: data,
        messages: data_messages,
        loading: false,
      });
      // console.log(response);
      return data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));

      throw error;
    }
  }

  async MessageDelete(id, index) {
    try {
      let response = await axiosInstance.delete(`messages/delete/${id}/`);
      const data_messages = this.state.messages;
      data_messages.splice(index, 1);
      this.setState({
        ...this.state,
        messages: data_messages,
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));

      throw error;
    }
  }

  componentDidMount() {
    this.getData();
  }

  manageTextLength = (text) => {
    return text.length < 25 ? text : `${text.slice(0, 25 - 5)}...`;
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <>
        <Base
          sidebar={
            <>
              <Container className="justify-content-left child-left">
                <Col className=" mb-5  justify-content-left child-left text-light">
                  <PersonalAccountSideBar profile={this.state.profile} />
                </Col>
              </Container>
            </>
          }
          main={
            <>
              <Container className="py-4">
                <Row>
                  <Col className="">
                    {this.state.messages.length > 0
                      ? this.state.messages.map((message, index) => {
                          return (
                            <div
                              className="message text-white p-2 pl-5 pr-3 mx-auto rounded-custom child-center mb-3"
                              key={index}
                            >
                              <div className="d-inline-block w-100 py-3">
                                {message.text}
                              </div>
                              <div
                                className="p-3 hover_effect"
                                onClick={() =>
                                  this.MessageDelete(message.id, index)
                                }
                              >
                                X
                              </div>
                            </div>
                          );
                        })
                      : " "}
                  </Col>
                </Row>
                <Row className="p-5-c mt-0 pt-0">
                  <Col>
                    <Col className="p-0 menu-options">
                      <Button
                        className="btn-settings"
                        href={
                          getUserRole() == 2 ? links.patients : links.doctors
                        }
                        variant="submit"
                        size="lg"
                      >
                        <h2 className="text-lighter">Patients</h2>
                        <div>
                          <h5 className="text-lighter">Some data</h5>
                        </div>
                      </Button>{" "}
                    </Col>
                    <Col className="p-0 menu-options">
                      <Button
                        className="btn-ex"
                        variant="submit"
                        size="lg"
                        onClick={handleLogout}
                      >
                        <h2 className="text-lighter">Logout</h2>
                        <h5 className="text-lighter">Logout from site</h5>
                      </Button>{" "}
                    </Col>
                  </Col>
                  <Col>
                    <Col className="p-0 menu-options">
                      <Button
                        className="btn-s "
                        href={links.requests}
                        variant="submit"
                        size="lg"
                      >
                        <h2 className="text-lighter">Requests</h2>
                        <div>
                          <h5 className="text-lighter">
                            {Pluralize(
                              "request",
                              this.state.profile.number_of_requests,
                              true
                            )}
                          </h5>
                        </div>
                      </Button>{" "}
                    </Col>

                    <Col className="p-0 menu-options">
                      <Button
                        className="btn-settings"
                        href="/personal_account/settings/"
                        variant="submit"
                        size="lg"
                      >
                        <h2 className="text-lighter">Settings</h2>
                        <div>
                          <h5 className="text-lighter">
                            Personalize your account
                          </h5>
                        </div>
                      </Button>{" "}
                    </Col>
                  </Col>
                </Row>
              </Container>
            </>
          }
        />
      </>
    );
  }
}
