import React, {Component} from "react";
import axiosInstance from "../axiosApi";

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
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/register/', {
                email: this.state.email,
                password: this.state.password
            });
            return response;
        } catch (error) {
            console.log("errors", error.stack);
            this.setState({
                errors: error.response.data
            });
        }
    }

    render() {
        return (
            <div>
                Register
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                        {/*{this.state.errors.email ? this.state.errors.email : null}*/}
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password}
                               onChange={this.handleChange}/>
                        {/*{this.state.errors.password ? this.state.errors.password : null}*/}
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Register;