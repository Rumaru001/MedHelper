import React from "react";
import {Container, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Base from "../../components/Main/Base";
import axiosInstance from "../../axiosApi";

const server = {
    errors: [],
    specifications: [],
    tags: ["a", "b"],
    fileCounter: 1,
};

const id = 0;

export default class MedCardAdd extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            files: "Choose files",
            loading: true,
        };
    }

    async getData() {
        try {
            let response_specs = await axiosInstance.get(`assignment/specification`);
            const specs = response_specs.data;
            let response_tags = await axiosInstance.get(`assignment/tag`);
            const tags = response_tags.data;
            this.setState({
                data: {},
                files: "Choose files",
                specifications: specs,
                tags: tags,
                loading: false,
                errors: [],
            });
            return [specs, tags];
        } catch (error) {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onChange(e) {
        const data = this.state.data;
        data[e.target.name] = e.target.value;
        this.setState(
            {
                ...this.state.data,
                data: data,
            },
            () => {
                console.log(this.state);
            }
        );
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const data = this.state.data;
        console.log(data);
        data.data = {
            files: this.state.files != "Choose files" ? this.state.files : [],
        };

        try {
            let response = await axiosInstance.post("/assignment/create", data);
            if (response.status >= 200 && response.status < 300) {
                this.props.history.push("/medical_card");
            }
        } catch (error) {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    handleFileChange = (e) => {
        var files = e.target.files;
        this.setState({
            ...this.state,
            files:
                files.length == 1
                    ? files[0].name
                    : files.length < 1
                    ? "Choose files..."
                    : `${files.length} files selected`,
        });
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
                        <Link
                            to={`/medical_card`}
                            className="text-light h5 font-weight-bold mx-auto"
                        >
                            <p className="text-decoration-none my-auto">MedCard</p>
                        </Link>
                    }
                    main={
                        <Container className="vh-100-c addassignmnet-container p-4">
                            <div className="w-100">
                                <Row>
                                    <Col>
                                        <p className="h2 text-center m-4">New Assignment</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form
                                            method="POST"
                                            onSubmit={(e) => {
                                                this.handleSubmit(e);
                                            }}
                                            className="my-4"
                                        >
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend className="w-25 text-center">
                                                    <InputGroup.Text
                                                        id="TitleAssignment"
                                                        className="nowrap child-center"
                                                    >
                                                        <p className="m-0">Title</p>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Name of assignment"
                                                    name="name"
                                                    onChange={(e) => this.onChange(e)}
                                                    required
                                                />
                                            </InputGroup>

                                            <InputGroup className="mb-3 ">
                                                <InputGroup.Prepend className="w-25 text-center">
                                                    <InputGroup.Text
                                                        id="SpecAssignment"
                                                        className="nowrap child-center"
                                                    >
                                                        <p className="m-0">Specification</p>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>

                                                <Form.Control
                                                    as="select"
                                                    name="specification"
                                                    onChange={(e) => this.onChange(e)}
                                                    defaultValue=""
                                                    required
                                                >
                                                    <option value="" disabled hidden>
                                                        Choose here
                                                    </option>
                                                    {this.state.specifications.map((element, index) => {
                                                        return (
                                                            <option key={index} value={element.id}>
                                                                {element.name}
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Control>
                                            </InputGroup>

                                            <InputGroup className="mb-3 ">
                                                <InputGroup.Prepend className="w-25 text-center">
                                                    <InputGroup.Text
                                                        id="SpecAssignment"
                                                        className="nowrap child-center"
                                                    >
                                                        <p className="m-0">Tag</p>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>

                                                <Form.Control
                                                    as="select"
                                                    onChange={(e) => this.onChange(e)}
                                                    defaultValue=""
                                                    name="tag"
                                                >
                                                    <option value="">Choose here</option>
                                                    {this.state.tags.map((element, index) => {
                                                        return (
                                                            <option key={index} value={element.id}>
                                                                {element.name}
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Control>
                                            </InputGroup>

                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend className="w-25 text-center">
                                                    <InputGroup.Text
                                                        id="textAssignment"
                                                        className="nowrap child-center"
                                                    >
                                                        <p className="m-0">Text of assignment</p>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>

                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="text"
                                                    onChange={(e) => this.onChange(e)}
                                                    required
                                                    placeholder="Enter description on assignment"
                                                />
                                            </InputGroup>

                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend className="w-25 text-center">
                                                    <InputGroup.Text
                                                        id="file-prepend"
                                                        className="nowrap child-center"
                                                    >
                                                        <p className="m-0">Upload files</p>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <div className="custom-file hover_effect">
                                                    <Form.File
                                                        className="position-relative custom-file-input"
                                                        name="files"
                                                        id="files"
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
                                                    <Link to={`/medical_card`}>
                                                        <Button
                                                            variant="info"
                                                            type="button"
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
                                                        Add
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
