import React from "react";
import {Container, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Base from "../../components/Main/Base";
import {personalSideBar} from "./AccountView";
import {AddButton} from "../../components/MedCard/AddButton";
import {useState} from "react";


const server = {
    errors: [],
    specifications: ["specification", "specification1"],
    fileCounter: 1,
    blocks:
        {
            name: "Oleksandr",
            surname: "Duda",
            email: "duda@gmail.com",
            phone: "+380956353464",
            address: "Stepana Bogdana 2",
            weight: "54 kg",
            height: "156 cm",
            blood: "O(I)Rh+",
            sex: "Male",
            avatar: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
        },
    text:
        {
            avatar: "Avatar",
            name: "Name",
            surname: "Surname",
            email: "Email",
            phone: "Phone",
            address: "Address",
            weight: "Weight",
            height: "Height",
            blood: "Blood Type",
            sex: "Sex"
        },
    files: ["Click to drop file"],
};

const id = 0;

const DisplayList = Object.keys(server.blocks).map((key, index) => (
    <InputGroup className="mb-3">
        <InputGroup.Prepend className="w-25 text-left">
            <InputGroup.Text
                id="TitleAssignment"
                className="nowrap child-center"
            >
                <p className="m-0">{server.text[key]}</p>
            </InputGroup.Text>
        </InputGroup.Prepend>

        <Form.Control
            type="text"
            placeholder="Name of assignment"
            required
            defaultValue={server.blocks[key]}
        />
    </InputGroup>
));


export default class PersonalAccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...server, file_value: ""};
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

    render() {


        return (
            <>
                <Base
                    sidebar={
                        <Container className="justify-content-left child-left">
                            <Col className="mb-5 justify-content-left child-left">
                                {personalSideBar()}
                                <Row>
                                    <AddButton to="/0/personal_account"
                                               className="addbtn-assignment text-light">
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
                                        <img title="Profile photo" alt="Profile photo"
                                             style={{width: "150px", height: "150px", borderRadius: "80px"}}
                                             src={server.blocks.avatar}/>
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


                                            {DisplayList}


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
