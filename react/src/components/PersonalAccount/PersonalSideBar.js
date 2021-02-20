import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import { Devider } from "../Main/Devider";
import "./styles.css";
import { getUserRole } from "../../App";

const side_bar_text = {
  text: {
    contact_number: "Phone",
    addres: "Address",
    weight: "Weight",
    height: "Height",
    blood: "Blood Type",
  },
  urls: {
    avatar: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
    sex: "https://www.flaticon.com/svg/static/icons/svg/3813/3813981.svg",
    email: "https://www.flaticon.com/svg/static/icons/svg/893/893292.svg",
    contact_number:
      "https://www.flaticon.com/svg/static/icons/svg/901/901120.svg",
    addres: "https://www.flaticon.com/svg/static/icons/svg/3595/3595598.svg",
    weight: "https://www.flaticon.com/premium-icon/icons/svg/2343/2343398.svg",
    height: "https://www.flaticon.com/premium-icon/icons/svg/3251/3251160.svg",
    blood: "https://www.flaticon.com/svg/static/icons/svg/1188/1188130.svg",
  },
};

export class PersonalAccountSideBar extends React.Component {
  render() {
    return (
      <>
        <Devider />
        <Row className="btn-bg ml-4 mr-2 p-3 my-lg-4 justify-content-center child-center mx-auto">
          <Col className="ml-2 justify-content-center child-center">
            <img
              title="Profile photo"
              alt="Profile photo"
              style={{ width: "110px", height: "110px", borderRadius: "80px" }}
              src={side_bar_text.urls.avatar}
            />
          </Col>
          <Col className="justify-content-left child-left">
            <Col>
              <Row className="justify-content-left child-left">
                <Row className="">
                  <div className="d-flex">
                    <div className="container rounded bg-transparent text-light font-weight-light">
                      <h3 className="justify-content-center child-center text-lighter text-responsive">
                        {this.props.profile.name} {this.props.profile.surname}
                      </h3>
                      <h5>{getUserRole() == 2 ? "Doctor" : "Patient"}</h5>
                    </div>
                  </div>
                </Row>
              </Row>
              <Row className="ml-1  justify-content-left child-left">
                <Row className="text-light">
                  <div className="d-flex">
                    <div>
                      <img
                        className="flip_H"
                        title="Sex"
                        alt="Sex"
                        style={{ width: "40px", height: "40px" }}
                        src={side_bar_text.urls.sex}
                      />
                    </div>
                    <div className="container rounded bg-transparent text-light font-weight-light">
                      <h3 className="text-responsive text-lighter">
                        {this.props.profile.sex}
                      </h3>
                    </div>
                  </div>
                </Row>
              </Row>
            </Col>
          </Col>
        </Row>

        <Devider />

        <Row className="btn-bg-text ml-2 mb-3 p-3 pr-1 my-lg-4 mx-auto ">
          <Col>
            <Row className=" d-flex justify-content-left child-left cursor-help">
              <InputGroup.Text
                id="TitleAssignment"
                className="bg-transparent border-0 w-22 m-1 p-1 text-lighter text-center"
              >
                <img
                  title="Email"
                  alt="Email"
                  style={{ width: "40px", height: "40px" }}
                  src={side_bar_text.urls.email}
                />
              </InputGroup.Text>

              <Row className="ml-2 justify-content-left child-left">
                <div className="container rounded bg-transparent text-light font-weight-light">
                  <h3 className="text-responsive text-lighter ">
                    {" "}
                    {this.props.profile.user.email}
                  </h3>
                </div>
              </Row>
            </Row>
            {Object.keys(side_bar_text.text).map((key, index) => (
              <Row
                className=" d-flex justify-content-left child-left cursor-help"
                key={index}
              >
                <InputGroup.Text
                  id="TitleAssignment"
                  className="bg-transparent border-0 w-22 m-1 p-1 text-lighter text-center"
                >
                  <img
                    title={side_bar_text.text[key]}
                    alt={side_bar_text.text[key]}
                    style={{ width: "40px", height: "40px" }}
                    src={side_bar_text.urls[key]}
                  />
                </InputGroup.Text>

                <Row className="ml-2 justify-content-left child-left">
                  <div className="container rounded bg-transparent text-light font-weight-light">
                    <h3 className="text-responsive text-lighter">
                      {" "}
                      {this.props.profile[key]}
                      {side_bar_text.text[key] === "Weight"
                        ? " kg"
                        : side_bar_text.text[key] === "Height"
                        ? " cm"
                        : ""}
                    </h3>
                  </div>
                </Row>
              </Row>
            ))}
          </Col>
        </Row>

        <Devider />
      </>
    );
  }
}
