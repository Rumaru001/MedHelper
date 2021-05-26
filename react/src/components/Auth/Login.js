import React, { Component } from "react";
import axiosInstance from "../../axiosApi";
import { validEmailRegex, validateForm, countErrors } from "./Register";

export async function axiosLogin(email, password) {
  try {
    const response = await axiosInstance.post("auth/token/obtain/", {
      email: email,
      password: password,
    });
    console.log(1)
    axiosInstance.defaults.headers["Authorization"] =
      "Bearer " + response.data.access;
    console.log(response.data);
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    // this.props.history.push('/0/personal_account');
    // return response;
    console.log(localStorage);
    return true;
  } catch (error) {
    return false;
    // throw error;
  }
}

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: false,
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
        message: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    module.exports
      .axiosLogin(this.state.email, this.state.password)
      .then((data) => {
        if (data) {
          this.props.history.push("/personal_account/");
        } else {
          this.state.errors.message = "Your password or email is not correct!";
          this.setState({});
        }
      });
  }

  async handleChange(event) {
    let errors = this.state.errors;
    switch (event.target.name) {
      case "email":
        errors.email = validEmailRegex.test(event.target.value)
          ? ""
          : "Email is not valid!";
        break;
      case "password":
        errors.password =
          event.target.value.length < 8
            ? "Password must be 8 characters long!"
            : "";
        break;
      default:
        break;
    }
    errors.message = "";

    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      formValid: await validateForm({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    this.setState({
      errorCount: await countErrors(this.state.errors),
    });
  }

  render() {
    return (
      <div className="wrapper-auth">
        <div className="form-wrapper-auth">
          <h2>Account Login</h2>
          <form className="form-auth" onSubmit={this.handleSubmit}>
            <div className="email-auth">
              <label className="label-auth" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                type="text"
                className="input-auth"
                placeholder="example@email.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {this.state.errors.email.length > 0 && (
                <span className="error-auth">{this.state.errors.email}</span>
              )}
            </div>
            <div className="password-auth">
              <label className="label-auth" htmlFor="password">
                Password
              </label>
              <input
                className="input-auth"
                type="password"
                name="password"
                placeholder="●●●●●●●●"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.errors.password.length > 0 && (
                <span className="error-auth">{this.state.errors.password}</span>
              )}
              <span className="error-auth">{this.state.errors.message}</span>
            </div>
            <div className="submit-auth">
              <button
                className="button-auth"
                disabled={!this.state.formValid || !this.state.errorCount}
              >
                Login
              </button>
            </div>
            <div className="info-auth">
              <small>
                Do not have an account? <a href="/register/">Sign up</a>
              </small>
              <br />
              <small>
                Forgotten your password? <a href="#">Reset</a>
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = {
  axiosLogin: axiosLogin,
  Login: Login,
};
