import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          signInEmail: '',
          signInPassword: '',
          invalidCreds: false
        };
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    document.getElementById("sign-in-error-msg").hidden = true;
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    document.getElementById("sign-in-error-msg").hidden = false;
                }
            })
    }

    render() {
        const { onRouteChange } = this.props; // need to declare this here because we don't bring the props in as variables like with a functional component. instead they come from the parent app.js smart component via the constructor above
        return (
            <article className='br2 mv4 w-90 w-50-m w-25-l mw6 center tc shadow-5 bg-half-white'>
                <main className="pa3 black-80 w-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0 pb1">
                        <legend className="f3 fw6 ph0 mh0" id="sign-in">Sign In</legend>
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
                            className="b ph3 pv2 input-reset ba bg-transparent dim pointer f6 dib br2 shadow-5"
                            id="sign-in-btn"
                            type="submit"
                            value="Sign in" 
                            onClick={this.onSubmitSignIn}
                        />
                        <div 
                            className="f7 pt2"
                            style={{color: 'var(--color-secondary-2-4)'}}
                            id="sign-in-error-msg"
                            hidden>
                            Invalid email or password
                        </div>
                        <div className="lh-copy mt3">
                        <p
                            className="f6 link dim black db pointer"
                            id="register"
                            onClick={() => onRouteChange('register')} >Register
                        </p>
                        </div>
                    </div>
                </main>
            </article>
          )
    }
}

export default SignIn;