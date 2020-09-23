import React, { useState } from 'react';
import "./Login.css";
import { auth } from "./../../imalFirebase";
import $ from 'jquery'; 

const Login = (props) => {

    const { setHasAccount } = props; 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [resetEmail, setResetEmail] = useState('');
    const [resetEmailError, setResetEmailError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                setError(err.message);
                break;
                case "auth/wrong-password":
                setError(err.message);
                break;
            }
          })
      }

    const handleSignUp = (e) => {
        e.preventDefault();
        setHasAccount(false);
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        auth
        .sendPasswordResetEmail(resetEmail)
        .then(() => {
            setError('');
            setSuccess("Check your inbox! Reset email link is sent to " + resetEmail);
            $("[data-dismiss=modal]").trigger({ type: "click" });
        })
        .catch(err => {
            switch(err.code) {
            case "auth/invalid-email":
            case "auth/user-not-found":
                setResetEmailError(err.message);
                break;
            }
        });
    }

    return (
    <div className="text-center">
         <form className="form-signin">
            <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
            <div className={error ? "alert alert-danger" : ""} role="alert">
                {error}
            </div>
            <div className={success ? "alert alert-success" : ""} role="alert">
                {success}
            </div>
            <input type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                autoFocus=""
                value={email}
                onChange={(e) => setEmail(e.target.value) }/>
            <label className="sr-only">Password</label>
            <input type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e) => handleLogin(e)} >EinLoggen</button>
            <br/>

            {/* RESET PASSWORD */}
            
            <div className="modal fade" id="resetPassword" tabIndex="-1" role="dialog" aria-labelledby="resetPasswordLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="resetPasswordLabel">Forgot Password?</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className={resetEmailError ? "alert alert-danger" : ""} role="alert">
                            {resetEmailError}
                        </div>
                        <input className="form-control" value={resetEmail} placeholder="Enter email" onChange={(e) => setResetEmail(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={(e) => handleResetPassword(e)}>Reset password</button>
                    </div>
                    </div>
                </div>
            </div>
            <p>Forgotten password? <span><a href="" data-toggle="modal" data-target="#resetPassword">Click here</a></span></p>
            <br/>
            <p>Don't have an account? </p>
            <button className="btn btn-lg btn-block btn-secondary" type="submit" onClick={(e) => handleSignUp(e)}>Anmelden</button>
            <p className="mt-5 mb-3 text-muted">© iMAL Deutsch 2020-2021</p>
       </form> 
    </div>
    )
}

export default Login;