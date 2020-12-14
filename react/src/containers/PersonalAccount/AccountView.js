import React from "react";
import Base from "../../components/Main/Base";
import {Container, Row, Col, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {AddButton} from "../../components/MedCard/AddButton";
import axiosInstance from "../../axiosApi";

const side_bar_text = {
    text:
        {
            contact_number: "Phone",
            addres: "Address",
            weight: "Weight",
            height: "Height",
            blood: "Blood Type",
        },
    urls:
        {
            avatar: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
            sex: "https://www.flaticon.com/svg/static/icons/svg/3813/3813981.svg",
            email: "https://www.flaticon.com/svg/static/icons/svg/893/893292.svg",
            contact_number: "https://www.flaticon.com/svg/static/icons/svg/901/901120.svg",
            addres: "https://www.flaticon.com/svg/static/icons/svg/3595/3595598.svg",
            weight: "https://www.flaticon.com/premium-icon/icons/svg/2343/2343398.svg",
            height: "https://www.flaticon.com/premium-icon/icons/svg/3251/3251160.svg",
            blood: "https://www.flaticon.com/svg/static/icons/svg/1188/1188130.svg",
        },
    sex:
        {
            Male: "https://www.flaticon.com/svg/static/icons/svg/893/893292.svg",
            Female: "https://www.flaticon.com/svg/static/icons/svg/893/893292.sv"
        }
}

export default class PersonalAccount extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: true,
        }
    }

    async getData() {
        try {
            console.log(localStorage);

            let response = await axiosInstance.get("auth/users/11/profile/");
            let response1 = await axiosInstance.get("assignment/");
            const data = response.data;
            const data1 = response1.data;

            this.setState({
                profile: data,
                assigment: response1.data,
                loading: false,
            });
            return data,data1;
        } catch (error) {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    componentDidMount() {
        console.log(this.getData());
    }

    manageTextLenght = (text) => {
        return text.length < 40 ? text : `${text.slice(0, 40 - 5)}...`;
    };

    render() {
        return this.state.loading ? (
            <div class="d-flex justify-content-center center_loading">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        ) : (
            <>
                <Base
                    sidebar={
                        <>
                            <Container className="justify-content-left child-left">
                                <Col className="mb-5 justify-content-left child-left">
                                    <h1 className="divider">
                                        <hr/>
                                    </h1>
                                    <Row className="p-3 my-lg-4 justify-content-center child-center">
                                        <Col className="ml-2 justify-content-center child-center">
                                            <img title="Profile photo" alt="Profile photo"
                                                 style={{width: "110px", height: "110px", borderRadius: "80px"}}
                                                 src={side_bar_text.urls.avatar}/>
                                        </Col>
                                        <Col className="justify-content-left child-left">
                                            <Col>
                                                <Row className="justify-content-left child-left">
                                                    <Row className="">
                                                        <div className="d-flex">
                                                            <div
                                                                className="container rounded bg-transparent text-dark font-weight-light">
                                                                <h3 className="justify-content-center child-center text-responsive">{this.state.profile.name} {this.state.profile.surname}</h3>
                                                            </div>
                                                        </div>

                                                    </Row>
                                                </Row>
                                                <Row className="ml-1 justify-content-left child-left">
                                                    <Row className="">
                                                        <div className="d-flex">
                                                            <div>
                                                                <img className='flip_H' title="Sex" alt="Sex"
                                                                     style={{width: "40px", height: "40px"}}
                                                                     src={side_bar_text.urls.sex}/>
                                                            </div>
                                                            <div
                                                                className="container rounded bg-transparent text-dark font-weight-light">
                                                                <h3 className="text-responsive">{this.state.profile.sex}</h3>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </Row>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row className="ml-2 mb-3 p-3 my-lg-4 ">
                                        <Col>
                                            <h1 className="divider">
                                                <hr/>
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Row className="ml-2 mb-3 p-3 my-lg-4 ">
                                        <Col>
                                            <Row className=" d-flex justify-content-left child-left cursor-help">
                                                <InputGroup.Text id="TitleAssignment"
                                                                 className="bg-transparent border-0 w-22 m-1 p-1 text-center">
                                                    <img title="Email"
                                                         alt="Email"
                                                         style={{width: "40px", height: "40px"}}
                                                         src={side_bar_text.urls.email}/>
                                                </InputGroup.Text>

                                                <Row className="ml-2 justify-content-left child-left">
                                                    <div
                                                        className="container rounded bg-transparent text-dark font-weight-light">
                                                        <h3 className="text-responsive"> {this.state.profile.user.email}</h3>
                                                    </div>
                                                </Row>

                                            </Row>
                                            {(Object.keys(side_bar_text.text).map((key, index) => (
                                                <Row className=" d-flex justify-content-left child-left cursor-help"
                                                     key={index}>

                                                    <InputGroup.Text id="TitleAssignment"
                                                                     className="bg-transparent border-0 w-22 m-1 p-1 text-center">
                                                        <img title={side_bar_text.text[key]}
                                                             alt={side_bar_text.text[key]}
                                                             style={{width: "40px", height: "40px"}}
                                                             src={side_bar_text.urls[key]}/>
                                                    </InputGroup.Text>

                                                    <Row className="ml-2 justify-content-left child-left">
                                                        <div
                                                            className="container rounded bg-transparent text-dark font-weight-light">
                                                            <h3 className="text-responsive"> {this.state.profile[key]}</h3>
                                                        </div>
                                                    </Row>

                                                </Row>
                                            )))}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <AddButton to="/personal_account/settings"
                                                   className="addbtn-assignment text-light">
                                            <p className="text-center my-auto">Settings</p>
                                        </AddButton>
                                    </Row>
                                </Col>


                            </Container>

                        </>
                    }
                    main={
                        <>
                            <Container>

                                <div className="mt-5 d-flex justify-content-center">
                                    <h1> Personal Account</h1>
                                </div>

                                <Row className="p-5-c">
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/medical_card" className="btn-lg" variant="warning">
                                            <h3>MedCard</h3>
                                            <h5 className="text-left">{this.manageTextLenght("1312")}</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/0/reminders" variant="danger" size="lg">
                                            <h3>Reminders</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/medical_card" variant="info" size="lg">
                                            <h3>MedCard</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className=" m-2 p-2">
                                        <Button href="/medical_card" variant="success" size="lg">
                                            <h3>MedCard</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/medical_card" variant="primary" size="lg">
                                            <h3>MedCard</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
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
