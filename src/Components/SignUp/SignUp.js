import React,  {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SignUp.css";
import  { VALIDATIONERROR } from "./../../Constants";
import { auth, db } from '../../imalFirebase';


const SignUp = (props) => {

    const { setHasAccount } = props; 


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [school, setSchool] = useState("");
    const [confirmSchool, setConfirmSchool] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isValidatingFirstName, setValidatingFirstName] = useState(false);
    const [isValidatingLastName, setValidatingLastName] = useState(false);
    const [firstNameIsValid, setFirstNameIsValid] = useState(false);
    const [lastNameIsValid, setLastNameIsValid] = useState(false);
    const [isValidatingSchool, setValidatingSchool] = useState(false);
    const [schoolIsValid, setSchoolIsValid] = useState(false);
    const [isEmailValidating, setEmailIsValidating] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [isPasswordValidating, setPasswordIsValidating] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [isConfirmPasswordValidating, setConfirmPasswordIsValidating] = useState(false);
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const [sendSignInLink, setSendSignInLink] = useState(false);

    var actionCodeSettings = {
        url: "http://localhost:3000/",
        handleCodeInApp: true
      };


    const handleSignup = () => {

        auth
        .createUserWithEmailAndPassword(email, password) 
        .then((data) => {
            console.log("created user with email ", email);  

            var user = data.user;
            var dateInFuture = new Date();
            dateInFuture.setDate(dateInFuture.getDate() + 30);
    
            db.collection('users').doc(user.uid).set({
              firstname: firstName,
              lastname: lastName,
              school: school,
              email: email,
              emailVerified: false,
              admin: false,
              expirydate: dateInFuture
            })
            .then(() => {
              console.log("Updated user with email " + email + " in firestore");
            })
            .catch((err) => {
              console.log("Error updating user to firestore " + err);
            })

            auth.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                console.log("Email sent to ", email);
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
                console.log("Error when sendingSignIn link to ", error);
            })

            setHasAccount(true);
            
            
        })
        .catch(err => {
            switch(err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                console.log(err.message);
                setGeneralError(err.message);
                break;
            }
        })
      }


    const handleLogin = (e) => {
        e.preventDefault();
        setHasAccount(true);
    }


    const validateAndSignUp = (e) => {
        e.preventDefault();
        if (firstNameIsValid && lastNameIsValid && schoolIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid) {
            setGeneralError("");
            handleSignup();
        } else {
            console.log("setting general error");
            setGeneralError("Please fill in all the fields");
        }
    }


    const validateFirstName = (name) => {
        setValidatingFirstName(true);
        name.length >= 2 ? setFirstNameIsValid(true) : setFirstNameIsValid(false);
    }

    const validateLastName = (name) => {
        setValidatingLastName(true);
        name.length >= 2 ? setLastNameIsValid(true) :  setLastNameIsValid(false)
    }

    const validateConfirmSchool = (value) => {
        setValidatingSchool(true);
        value === school ? setSchoolIsValid(true) : setSchoolIsValid(false);
    }

    const validatePassword = (value) => {
        if (value.length < 6 ) {
            setPasswordError(VALIDATIONERROR.PASSWORD_LENGTH_TOO_SHORT)
            return;
        }
        const containsSmallLetter = value.match(/[a-z]/);
        // const contiansCapitalLetter = value.match(/[A-Z]/);
        const containsNumber = value.match(/[0-9]/);
        
        if (!containsSmallLetter) {
            setPasswordError(VALIDATIONERROR.PASSWORD_MUST_CONTAIN_LOWER_CASE)
            return;
        }

        // if (!contiansCapitalLetter) {
        //     setPasswordError(VALIDATIONERROR.PASSWORD_MUST_CONTAIN_CAPITAL_CASE)
        //     return;
        // } 

        if (!containsNumber) {
            setPasswordError(VALIDATIONERROR.PASSWORD_MUST_CONTAIN_NUMBER)
            return;
        }
        setPasswordIsValid(true);
    }

    const validateConfirmPassword = (value) => {
        setGeneralError('');
        if (value.length < 6 ) {
            setConfirmPasswordError(VALIDATIONERROR.PASSWORD_LENGTH_TOO_SHORT)
            return;
        }
        const containsSmallLetter = value.match(/[a-z]/);
        const contiansCapitalLetter = value.match(/[A-Z]/);
        
        if (!containsSmallLetter) {
            setConfirmPasswordError(VALIDATIONERROR.PASSWORD_MUST_CONTAIN_LOWER_CASE)
            return;
        }

        // if (!contiansCapitalLetter) {
        //     setConfirmPasswordError(VALIDATIONERROR.PASSWORD_MUST_CONTAIN_CAPITAL_CASE)
        //     return;
        // } 

        if (password === value) {
            setConfirmPasswordIsValid(true);
            console.log("passord er valid");
        } else {
            setConfirmPasswordError(VALIDATIONERROR.PASSWORDS_NOT_EQUAL)
            return;
        }

    }

    const validateEmail = (value) => {
        setEmailIsValidating(true);
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(String(value).toLowerCase()) ) {
            setEmailIsValid(true);
        } else {
            setEmailIsValid(false);
            setEmailError(VALIDATIONERROR.EMAIL_NOT_VALID);
        }
    }

    return (
        
        <div className="text-center">
        <form className="form-signup">
            <h1 className="h3 mb-3 font-weight-normal">Bestellen Sie einen Benutzer</h1>
            <input type="text"
                id="inputFirstName"
                className={isValidatingFirstName ? (firstNameIsValid ? "form-control is-valid" : "form-control is-invalid") : "form-control"}
                placeholder="Vorname"
                required
                autoFocus
                minLength="2"
                value={firstName}
                onChange={(e) => {
                     setFirstName(e.target.value);
                     validateFirstName(e.target.value);
                    } 
                }
            />
            {/* <label className="sr-only">Nachname</label> */}
            <input type="text"
                id="inputLastName"
                className={isValidatingLastName ? (lastNameIsValid ? "form-control is-valid" : "form-control is-invalid") : "form-control"}
                placeholder="Nachname"
                minLength="2"
                required
                value={lastName}
                onChange={(e) => { 
                    setLastName(e.target.value)
                    validateLastName(e.target.value);
                    }
                }

            />
            <input type="text"
                id="inputSchool"
                className={isValidatingSchool ? (schoolIsValid ? "form-control is-valid" : "form-control is-invalid") : "form-control" }
                placeholder="Schule"
                minLength="2"
                required
                value={school}
                onChange={(e) => {
                    setSchool(e.target.value)
                }}
            />
            <input type="text"
                id="inputConfirmSchool"
                className={ isValidatingSchool ? (schoolIsValid ? "form-control is-valid" : "form-control is-invalid") : "form-control" }
                placeholder="Bestätigung von der Schule"
                minLength="2"
                required
                value={confirmSchool}
                onChange={(e) => {
                    setConfirmSchool(e.target.value)
                    validateConfirmSchool(e.target.value);
                    }
                }
            />
            <div className="invalid-feedback">
                {VALIDATIONERROR.SCHOOLNAME_NOT_EQUAL}
            </div>
            <input type="email"
                id="inputEmail"
                className={ isEmailValidating ? (emailIsValid ? "form-control is-valid" : "form-control is-invalid") : "form-control" }
                placeholder="Email adresse"
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    validateEmail(e.target.value);
                } }
            />
            { isEmailValidating ? 
            <div className="invalid-feedback">
                {emailError}
            </div>
            : null } 
            <label className="sr-only">Passwort</label>
            <input type="password"
                id="inputPassword"
                className={ isPasswordValidating ? (passwordIsValid ? "form-control is-valid" : "form-control is-invalid") : "form-control" }
                placeholder="Passwort" 
                required
                minLength="6"
                value={password} 
                onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordIsValidating(true);
                    validatePassword(e.target.value);
                } 
            } />
            { isPasswordValidating ? 
            <div className="invalid-feedback">
                {passwordError}
            </div>
            : null } 
            <input type="password"
                id="inputConfirmPassword"
                className={isConfirmPasswordValidating ? (confirmPasswordIsValid ? "form-control is-valid" : "form-control is-invalid") : "form-control" }
                placeholder="Bestätige das Passwort" 
                required
                minLength="6"
                value={confirmPassword} 
                onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setConfirmPasswordIsValidating(true);
                    validateConfirmPassword(e.target.value);
                }} />
            { isConfirmPasswordValidating ? 
            <div className="invalid-feedback">
                {confirmPasswordError}
            </div>
            : null } 
            <p className="errorMsg">{generalError}</p>
            {/* <div className="invalid-feedback">
                { generalError }
            </div> */}
            {/* <input type="checkbox"></input> <label>Angemeldet bleiben</label> */}
            <br />
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e) => validateAndSignUp(e)}>Anmelden</button>
            <br />
            <p>Sie haben bereits ein Konto?</p>
            <button className="btn btn-lg btn-block btn-secondary" onClick={(e) => handleLogin(e)}>EinLoggen</button>
                 {/* <span onClick={onSignUpClick()}><a href={e.preventDefault} onClick={onSignUpClick()}>Sign up</a></span></p> */}
            {/* <input type="checkbox" value="remember-me">Remember me</input> */}
            <p className="mt-5 mb-3 text-muted">© iMAL Deutsch 2020-2021</p>
        </form>
    </div>
    )
}

export default SignUp;