import React, {Component} from "react";
import axiosInstance from "../../axiosApi";
import {Link} from "react-router-dom";
import {Button, Container} from "react-bootstrap";


class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('auth/logout/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            window.location.href="/";
            return response;
        } catch (e) {
            console.log(e);
        }
    };


    render() {
        return (
            <Container className="d-flex justify-content-center child-center child-center">
                {/*<Link to={`/hello/`}>Hello</Link>*/}
                <Button classname="w-100" onClick={this.handleLogout}>Logout</Button>
            </Container>
        );
    }
}

export default Logout;