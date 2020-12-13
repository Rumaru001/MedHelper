import React from "react";
import {Container, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Base from "../../components/Main/Base";
import {AddButton} from "../../components/MedCard/AddButton";
import axiosInstance from "../../axiosApi";

const server = {
    errors: [],
    specifications: ["specification", "specification1"],
    fileCounter: 1,
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
    text: {
        avatar: "Avatar",
        name: "Name",
        surname: "Surname",
        email: "Email",
        contact_number: "Phone",
        addres: "Address",
        weight: "Weight",
        height: "Height",
        blood: "Blood Type",
        sex: "Sex",
    },
    files: ["Click to drop file"],
};

const id = 0;

export default class PersonalAccountSettings extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            ...server,
            loading: true,
            file_value: ""
        }
    }

    handleChange = () => {
        return;
    };
    handleSubmit = () => {
        return;
    };

    handleFileChange = (e) => {
        var files = e.target.files;
        this.setState({
            ...this.state,
            file_value:
                files.length == 1
                    ? files[0].name
                    : files.length < 1
                    ? "Choose files..."
                    : `${files.length} files selected`,
        });
    };

    async getData() {
        try {
            console.log(localStorage);

            let response = await axiosInstance.get("auth/users/11/profile/");
            const data = response.data;
            this.setState({
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
            <div class="d-flex justify-content-center center_loading" >
                <div class="spinner-border" role="status" >
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        ) : (
            <>
                <Base
                    sidebar={
                        <Container className="justify-content-left child-left">
                            <Col className="mb-5 justify-content-left child-left">
                                <h1 className="divider">
                                    <hr/>
                                </h1>
                                <Row className="p-3 my-lg-4 justify-content-center child-center">
                                    <Col className="ml-2 justify-content-center child-center">
                                        <img title="Profile photo" alt="Profile photo"
                                             style={{width: "110px", height: "110px", borderRadius: "80px"}}
                                             src={server.urls.avatar}/>
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
                                                                 src={server.urls.sex}/>
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
                                        {(Object.keys(server.text).map((key, index) => (
                                            <Row className=" d-flex justify-content-left child-left cursor-help"
                                                 key={index}>

                                                <InputGroup.Text id="TitleAssignment"
                                                                 className="bg-transparent border-0 w-22 m-1 p-1 text-center">
                                                    <img title={server.text[key]}
                                                         alt={server.text[key]}
                                                         style={{width: "40px", height: "40px"}}
                                                         src={server.urls[key]}/>
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
                                    <AddButton
                                        to="/0/personal_account"
                                        className="addbtn-assignment text-light"
                                    >
                                        <p className="text-center my-auto">Back To Personal Page</p>
                                    </AddButton>
                                </Row>
                            </Col>
                        </Container>
                    }
                    main={
                        <Container className="vh-100-c addassignmnet-container p-4">
                            <div className="w-100">
                                <Row>
                                    <Col>
                                        <p className="h2 text-center m-4">Edit Data</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="ml-2 justify-content-center child-center">
                                        <img
                                            title="Profile photo"
                                            alt="Profile photo"
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                borderRadius: "80px",
                                            }}
                                            src={server.urls.avatar}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form
                                            noValidate
                                            onSubmit={this.handleSubmit}
                                            className="my-4"
                                        >
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {server.errors.state}
                                            </Form.Control.Feedback>

                                            {
                                                Object.keys(this.state.profile).map((key, index) => (
                                                    <InputGroup className="mb-3" key={index}>
                                                        <InputGroup.Prepend className="w-25 text-left">
                                                            <InputGroup.Text id="TitleAssignment"
                                                                             className="nowrap child-center">
                                                                <p className="m-0">{server.text[key]}</p>
                                                            </InputGroup.Text>
                                                        </InputGroup.Prepend>

                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Name of assignment"
                                                            required
                                                            defaultValue={this.state.profile[key]}
                                                        />
                                                    </InputGroup>
                                                ))
                                            }

                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend className="w-25 text-center">
                                                    <InputGroup.Text
                                                        id="file-prepend"
                                                        className="nowrap child-center"
                                                    >
                                                        <p className="m-0">Upload Personal Avatar</p>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>

                                                <div className="custom-file hover_effect">
                                                    <Form.File
                                                        className="position-relative custom-file-input"
                                                        required
                                                        name="files"
                                                        id="files"
                                                        defaultValue={this.state.file_value}
                                                        onChange={(e) => this.handleFileChange(e)}
                                                        aria-describedby="file-prepend"
                                                        multiple
                                                    />
                                                    <label
                                                        className="custom-file-label text-secondary"
                                                        htmlFor="files"
                                                    >
                                                        {this.state.files}
                                                    </label>
                                                </div>
                                            </InputGroup>

                                            <Row>
                                                <Col>
                                                    <Link to={`/${id}/medical_card`}>
                                                        <Button
                                                            variant="info"
                                                            type="submit"
                                                            className="w-100 my-5 font-weight-bold w-100 p-3 mx-auto "
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        variant="success"
                                                        type="submit"
                                                        className="w-100 my-5 font-weight-bold w-100 p-3 mx-auto "
                                                    >
                                                        Save
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