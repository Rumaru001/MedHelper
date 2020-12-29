import React from "react";
import Base from "../../components/Main/Base";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../axiosApi";
import { PersonalAccountSideBar } from "../../components/PersonalAccount/PersonalSideBar";
import "../../components/PersonalAccount/styles.css";
import { Loading } from "../../components/Main/loading";
import { handleLogout, Logout } from "../../components/Auth/Logout";
import { AddButton } from "../../components/MedCard/AddButton";

export default class PersonalAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async getData() {
    try {
      console.log(localStorage);

      let response = await axiosInstance.get("auth/users/profile/");
      const data = response.data;
      let response_assignment = await axiosInstance.get("assignment/last");
      const data_assignment = response_assignment.data.assignment;
      this.setState({
        profile: data,
        assignment: data_assignment,
        loading: false,
      });
      return data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  componentDidMount() {
    console.log(this.getData());
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
              <Container>
                <Row className="p-5-c mt-4">
                  <Col>
                    <Col className="mr-1 m-2 p-2">
                      <Button
                        className="btn-med_card "
                        href="/medical_card"
                        variant="submit"
                        size="lg"
                      >
                        <h2 className="text-lighter">MedCard</h2>
                        <h5 className="text-lighter">
                          <p>{this.state.assignment.name}</p>
                          <p>
                            {this.manageTextLength(this.state.assignment.text)}
                          </p>
                        </h5>
                      </Button>{" "}
                    </Col>
                    <Col className="mr-1 m-2 p-2">
                      <Button
                        className="btn-reminders"
                        href="/reminders"
                        variant="submit"
                      >
                        <h1 className="divider">
                          <hr />
                        </h1>
                        <h2 className="text-lighter">Reminders</h2>
                        <h1 className="divider">
                          <hr />
                        </h1>

                        <Col className="mx-auto p-auto my-2">
                          <Button className="my-2 p-2 btn-reminders-child">
                            <h5>Some text here to remember</h5>
                          </Button>
                          <Button className="my-2 p-2 btn-reminders-child">
                            <h5>And some text here to remember</h5>
                          </Button>
                          <Button className="my-2 p-2 btn-reminders-child">
                            <h5>You know and here some text to remember</h5>
                          </Button>
                          <Button className="my-2 p-2 btn-reminders-child">
                            <h5>You know and here some text to remember</h5>
                          </Button>
                        </Col>
                      </Button>{" "}
                    </Col>
                  </Col>
                  <Col>
                    <Col className=" m-2 p-2">
                      <Button
                        className="btn-s "
                        href="/medical_card"
                        variant="submit"
                        size="lg"
                      >
                        <h2 className="text-lighter">MedCard</h2>
                        <div>
                          <h5 className="text-lighter">
                            Visit to a doctor on a 01-12-2020.
                          </h5>
                        </div>
                      </Button>{" "}
                    </Col>

                    <Col className=" m-2 p-2">
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
                    <Col className=" m-2 p-3">
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
                </Row>
              </Container>
            </>
          }
        />
      </>
    );
  }
}
