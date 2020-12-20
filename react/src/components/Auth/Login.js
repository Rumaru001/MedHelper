import React, {Component} from "react";
import axiosInstance from "../../axiosApi";
import {Link} from "react-router-dom";
import {} from "react-router-dom";
import Base from "../Main/Base";
import {Container, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import "./Login.css";

export async function axiosLogin(email, password) {
    //event.preventDefault();
    try {
        const response = await axiosInstance.post('auth/token/obtain/', {
            email: email,
            password: password
        });
        axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        // this.props.history.push('/0/personal_account');
        return response;
    } catch (error) {
        throw error;
    }
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        axiosLogin(this.state.email, this.state.password).then(() => {
                this.props.history.push('/hello/');
            }
        )
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div class="center bg-secondary p-4 rounded-lg">
                <h2 className="text-light">Account Login</h2>
                <h2>
                    <Col d-flex justify-content-center>
                        <form>
                            <div class="d-flex justify-content-center">
                                <div class="input-group-prepend">
                                </div>
                                <input name="email" type="text" className="form-control" placeholder="Email"
                                       value={this.state.email}
                                       onChange={this.handleChange}/>
                            </div>
                        </form>
                        <div class="d-flex justify-content-center">
                            <div class="input-group-prepend">
                            </div>
                            <input name="password" type="password" className="form-control" placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handleChange}/>
                        </div>

                        <Container>
                            <Container className="d-flex justify-content-center">
                                <Button type="button" onClick={this.handleSubmit}>
                                    Login
                                </Button>
                            </Container>
                        </Container>
                    </Col>
                </h2>
            </div>

        )
            ;
    }
}
