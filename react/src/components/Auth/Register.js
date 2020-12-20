import React, {Component} from "react";
import axiosInstance from "../../axiosApi";
import "./form_style.css";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (values) => {
    let valid = true;
    let array = Object.values(values);
    for (var i = 0; i < array.length; i++) {
        if (array[i].length === 0) {
            valid = false;
            break;
        }
    }
    return valid;
}

const countErrors = (errors) => {
    let valid = true;
    let array = Object.values(errors);
    for (var i = 0; i < array.length; i++) {
        if (array[i].length !== 0) {
            valid = false;
            break;
        }
    }
    return valid;
}


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            values: {
                email: '',
                password: '',
                password2: '',
            },
            errors: {
                email: '',
                password: '',
                password2: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const {name, value} = event.target;


        let values = this.state.values;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                values.email = value
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                values.password = value
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                errors.password2 =
                    value !== this.state.values.password2
                        ? 'Passwords do not equal!'
                        : '';
                break;
            case 'password2':
                values.password2 = value
                errors.password2 =
                    value !== this.state.values.password
                        ? 'Passwords do not equal!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors});
        this.setState({"formValid": validateForm(values)})
        this.setState({"errorCount": countErrors(errors)})
    }

    async handleSubmit(event) {
        event.preventDefault();
        let flag = validateForm(this.state.values)
            && countErrors(this.state.errors);

        if (flag) {
            try {
                const response = await axiosInstance.post('auth/register/', {
                    email: this.state.values.email,
                    password: this.state.values.password,
                    password2: this.state.values.password2
                }).then(
                    this.props.history.push('/login/')
                )
            } catch (error) {
                console.log("errors", error.stack);
                this.setState({
                    errors: error.response.data
                });
            }
        }


    }

    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h2>Create Account</h2>
                    <form className="form" onSubmit={this.handleSubmit} noValidate>
                        <div className='email'>
                            <label className="label" htmlFor="email">Email</label>
                            <input className="input-auth" type='email' name='email'
                                   placeholder="example@email.com"
                                   onChange={this.handleChange}/>
                            {this.state.errors.email.length > 0 &&
                            <span className='error'>{this.state.errors.email}</span>}
                        </div>
                        <div className='password'>
                            <label className="label" htmlFor="password">Password</label>
                            <input className="input-auth" type='password' name='password'
                                   placeholder="●●●●●●●●"
                                // value={this.state.data.password}
                                   onChange={this.handleChange}/>
                            {this.state.errors.password.length > 0 &&
                            <span className='error'>{this.state.errors.password}</span>}
                        </div>
                        <div className='password'>
                            <label className="label" htmlFor="password2">Confirm password</label>
                            <input className="input-auth" type='password' name='password2'
                                   placeholder="●●●●●●●●"
                                   onChange={this.handleChange}/>
                            {this.state.errors.password2.length > 0 &&
                            <span className='error'>{this.state.errors.password2}</span>}
                        </div>
                        <div className='submit'>
                            <button disabled={!this.state.formValid && !this.state.errorCount}
                                    className="button">
                                Create
                            </button>
                        </div>
                        <div className='info'>
                            <small>Do not have an account? <a href="#">Sign up</a></small>
                        </div>
                        {/*{this.state.errorCount !== false && this.state.formValid
                            ? <p className="form-status">Form is
                                {this.state.formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''}*/}
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;