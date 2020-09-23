import React,  {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewSignUp = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleSignup,
    } = props;


    return (
        <div className="text-center">
        <form className="form-signup">
            <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
            <input type="email"
                id="inputEmail"
                className="form-control" 
                placeholder="Email adresse"
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                } }
            />
            <input type="password"
                id="inputPassword"
                className="form-control" 
                placeholder="Passwort" 
                required
                minLength="6"
                value={password} 
                onChange={(e) => {
                    setPassword(e.target.value)
                } 
            } />
            <input type="checkbox"></input> <label>Angemeldet bleiben</label>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e) => handleSignup()}>Anmelden</button>
            
            <p>Already have an account?</p>
            {/* <button className="btn btn-lg btn-block btn-secondary" onClick={() => setHasAccount(true)}>EinLoggen</button> */}
                 {/* <span onClick={onSignUpClick()}><a href={e.preventDefault} onClick={onSignUpClick()}>Sign up</a></span></p> */}
            {/* <input type="checkbox" value="remember-me">Remember me</input> */}
            <p className="mt-5 mb-3 text-muted">© iMAL Deutsch 2020-2021</p>
        </form>
    </div>
    )
}

export default NewSignUp;