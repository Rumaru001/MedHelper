import React from "react";
import Base from "../../components/Main/Base";
import {Col, Container, Row} from "react-bootstrap";
import {PersonalAccountSideBar} from "../../components/PersonalAccount/PersonalSideBar";
import axiosInstance from "../../axiosApi";
import {Loading} from "../../components/Main/loading";
import Button from "react-bootstrap/Button";

export default class Reminders extends React.Component {

  constructor(props) {

        super(props);
        this.state = {
            loading: true,
            file_value: ""
        }
    }

    onChange(e) {
        const data = this.state.data;
        data[e.target.name] = e.target.value;
        this.setState(
            {
                data: data,
            },
            console.log(this.state)
        );
    }

    async getData() {
        try {
            console.log(localStorage);

            let response = await axiosInstance.get("auth/users/profile/");
            const data = response.data;
            this.setState({
                data: {},
                profile: data,
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
                <Col className="mr-1 m-2 p-2">
                      <Button
                        className=""

                        variant="submit"
                      >
                        <h1 className="divider">
                          <hr />
                        </h1>
                        <h1 className="text-lighter">Reminders</h1>
                        <h1 className="divider">
                          <hr />
                        </h1>

                        <Col className="mx-auto p-auto my-2">
                          <Button className="my-2 p-5 btn-reminders-page">
                            <h4>Appointment to an ophthalmologist on February 13 at 2:15 p.m.</h4>
                          </Button>
                          <Button className="my-2 p-5 btn-reminders-page">
                            <h4>Visit medical center to process data</h4>
                          </Button>
                          <Button className="my-2 p-5 btn-reminders-page">
                            <h4>Results of urine tests</h4>
                          </Button>
                          <Button className="my-2 p-5 btn-reminders-page">
                            <h4>Fill your personal data on site</h4>
                          </Button>
                        </Col>
                      </Button>{" "}
                    </Col>
            </>
          }
        />
      </>
    );
  }
}