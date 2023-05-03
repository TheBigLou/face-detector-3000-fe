import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          name: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    validateInput = () => {
        const { email, password, name } = this.state;

        if (email === '' || password === '' || name === '') {
            return false;
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        return true;
    }

    onSubmitRegistration = () => {
        if (!this.validateInput()) {
            document.getElementById("reg-error-msg").innerHTML = 'Fill in all fields and provide a valid email address';
            document.getElementById("reg-error-msg").hidden = false;
            return;
        }

        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.existingEmail) {
                document.getElementById("reg-error-msg").innerHTML = 'Email address already registered';
                document.getElementById("reg-error-msg").hidden = false;
            } else if(data.id) {
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            } else if (data.regFail) {
                document.getElementById("reg-error-msg").innerHTML = 'Unknown registration error, try again';
                document.getElementById("reg-error-msg").hidden = false;
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className='br2 mv4 w-90 w-50-m w-25-l mw6 center tc shadow-5 bg-half-white'>
                <main className="pa3 black-80 w-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0" id="register">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                onChange={this.onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white" 
                                type="text" 
                                name="name"  
                                id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white" 
                                type="email" 
                                name="email-address"  
                                id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white" 
                                type="password" 
                                name="password"  
                                id="password" />
                        </div>
                        </fieldset>
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent dim pointer f6 dib br2 shadow-5"
                            type="submit"
                            value="Register" 
                            id="register-btn"
                            onClick={this.onSubmitRegistration}
                        />
                        <div 
                            className="f7 pt2 w-100"
                            style={{color: 'var(--color-secondary-2-4)'}}
                            id="reg-error-msg"
                            hidden>
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                className="f6 link dim black db pointer"
                                id="sign-in"
                                onClick={() => onRouteChange('signIn')} >I already have an account
                            </p>
                        </div>
                    </div>
                </main>
            </article>
      )
    }
}

export default Register;