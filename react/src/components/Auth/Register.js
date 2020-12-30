import React, {Component} from "react";
import axiosInstance from "../../axiosApi";
import "./form_style.css";

export const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const validateForm = (values) => {
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

export const countErrors = (errors) => {
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
            errorCount: false,
            values: {
                email: '',
                password: '',
                password2: '',
                user_type: '1',
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
            case 'user-type':
                values.user_type = value
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
                    password2: this.state.values.password2,
                    user_type: this.state.values.user_type,
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
            <div className="wrapper-auth">
                <div className="form-wrapper-auth">
                    <h2>Create Account</h2>
                    <form className="form-auth" onSubmit={this.handleSubmit} noValidate>
                        <div className='email-auth'>
                            <label className="label-auth" htmlFor="email">Email</label>
                            <input className="input-auth" type='email' name='email'
                                   placeholder="example@email.com"
                                   onChange={this.handleChange}/>
                            {this.state.errors.email.length > 0 &&
                            <span className='error-auth'>{this.state.errors.email}</span>}
                        </div>
                        <div className='password-auth'>
                            <label className="label-auth" htmlFor="password">Password</label>
                            <input className="input-auth" type='password' name='password'
                                   placeholder="●●●●●●●●"
                                   onChange={this.handleChange}/>
                            {this.state.errors.password.length > 0 &&
                            <span className='error-auth'>{this.state.errors.password}</span>}
                        </div>
                        <div className='password-auth'>
                            <label className="label-auth" htmlFor="password2">Confirm password</label>
                            <input className="input-auth" type='password' name='password2'
                                   placeholder="●●●●●●●●"
                                   onChange={this.handleChange}/>
                            {this.state.errors.password2.length > 0 &&
                            <span className='error-auth'>{this.state.errors.password2}</span>}
                        </div>
                        <div className="password-auth">
                            <label className="label-auth" htmlFor="user-type">User type</label>
                            <select name="user-type"
                                    className="input-auth"
                                    onChange={this.handleChange}>
                                <option value='1'>Patient</option>
                                <option value='2'>Doctor</option>
                                <option value='0'>Admin</option>
                            </select>
                        </div>
                        <div className='submit-auth'>
                            <button disabled={!this.state.formValid || !this.state.errorCount}
                                    className="button-auth">
                                Create
                            </button>
                        </div>
                        <div className='info-auth'>
                            <small>Do you have an account? <a href="/login/">Sign in</a></small>
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