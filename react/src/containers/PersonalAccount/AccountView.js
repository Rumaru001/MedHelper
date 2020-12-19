import React from "react";
import Base from "../../components/Main/Base";
import {Container, Row, Col, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../axiosApi";
import {PersonalAccountSideBar} from "../../components/PersonalAccount/PersonalSideBar";
import {AddButton} from "../../components/MedCard/AddButton";


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

            let response = await axiosInstance.get("auth/users/profile/");
            const data = response.data;
            let response_assignment = await axiosInstance.get("assignment/");

            const data_assignment = response.data.assignments;
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
        return text.length < 40 ? text : `${text.slice(0, 40 - 5)}...`;
    };

    render() {
        return this.state.loading ? (
            <div className="d-flex justify-content-center center_loading">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : (
            <>
                <Base
                    sidebar={
                        <>
                            <Container className="justify-content-left child-left">
                                <Col className="mb-5 justify-content-left child-left">
                                    <PersonalAccountSideBar profile={this.state.profile}/>
                                    <Row>
                                        <AddButton to="/personal_account/settings/ "
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
                                            <h5 className="text-center">{this.manageTextLength("")}</h5>
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
