import React, {Component} from "react";
import axiosInstance from "../../axiosApi";
import "./Register.css";
import {Button, Col, Container} from "react-bootstrap";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        try {
            const response = await axiosInstance.post('auth/register/', {
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2
            });
        } catch (error) {
            console.log("errors", error.stack);
            this.setState({
                errors: error.response.data
            });
        }
    }

    render() {
        return (
            <div className="center bg-secondary p-4 rounded-lg">
                <h2 className="text-light">Register Page</h2>
                <h2>
                    <Col d-flex justify-content-center>
                        <form onSubmit={this.handleSubmit}>
                            <div class="d-flex justify-content-center">
                                <div class="input-group-prepend">
                                </div>
                                <input name="email" type="email" className="form-control" placeholder="Email"
                                       value={this.state.email}
                                       onChange={this.handleChange}/>
                            </div>
                        </form>
                        <div className="d-flex justify-content-center">
                            <div className="input-group-prepend">
                            </div>
                            <input name="password" type="password" className="form-control" placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="input-group-prepend">
                            </div>
                            <input name="password" type="password" className="form-control"
                                   placeholder="ConfirmPassword"
                                   value={this.state.password2}
                                   onChange={this.handleChange}/>
                        </div>
                        <Container>
                            <Container className="d-flex justify-content-center">
                                <Button type="button" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Container>
                        </Container>
                    </Col>
                </h2>
            </div>
        )
    }
}

export default Register;