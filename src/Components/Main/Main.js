import React, {useState, useEffect} from 'react';
import './Main.css';
import { db } from "./../../imalFirebase";
import Profile from '../Profile/Profile';
import Logout from '../Logout/Logout';
import Spinner from '../Spinner/Spinner';
import $ from 'jquery'; 
import ListUsers from '../UserManagement/ListUsers';
import NoAccess from './NoAccess';
import ErrorMessage from '../Error/ErrorMessage';
import ErrorCard from '../Error/ErrorCard';
import { MAINPAGE_COMPONENT, MAINPAGE_STATE } from './../../Constants';

const Main = (props) => {

    const { authUser } = props;
    const [user, setUser] = useState('');

    const [mainPageComponent, setMainPageComponent] = useState(null);
    const [currentState, setCurrentState] = useState(MAINPAGE_STATE.LOADING);

    useEffect(() => {
        if (!authUser.emailVerified) {
            setCurrentState(MAINPAGE_STATE.USER_NOT_VERIFIED);
        } else {
            getCurrentUser();
        }
    }, []);


    useEffect(() => {
        if (mainPageComponent === MAINPAGE_COMPONENT.USER_MANAGEMENT) {
            $("#userManagement").addClass("active");
            $("#profile").removeClass("active");
        }
        if (mainPageComponent === MAINPAGE_COMPONENT.PROFILE) {
            $("#profile").addClass("active");
            $("#userManagement").removeClass("active");
        }
    });

    const getCurrentUser = () => {
        var docRef = db.collection('users').doc(authUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                var data = doc.data();
                setUser(data);
                var expirydate = data.expirydate; 
                var dateNow = new Date();
                var hasAccess = expirydate.toMillis() > dateNow.getTime();
                hasAccess ? setCurrentState(MAINPAGE_STATE.MAINPAGE) : setCurrentState(MAINPAGE_STATE.ERROR_NO_ACCESS)
                data.admin ? setMainPageComponent(MAINPAGE_COMPONENT.USER_MANAGEMENT) : setMainPageComponent(MAINPAGE_COMPONENT.PROFILE);
            } else {
                setCurrentState(MAINPAGE_STATE.ERROR_USER_DOES_NOT_EXIST_IN_FIRESTORE);
            }
        })
        .catch((error) => {
            setCurrentState(MAINPAGE_STATE.ERROR_DATABASE_CONNECTION);
            console.log(MAINPAGE_STATE.ERROR_DATABASE_CONNECTION, error);
        });
    }

    const UserManagementNavigationLink = () => {
        return (
            <li id="userManagement" className="nav-item">
                <a className="nav-link" href="/" onClick={(e) => {
                    e.preventDefault();
                    setMainPageComponent(MAINPAGE_COMPONENT.USER_MANAGEMENT);
                }}>User Management</a>
            </li> 
        )
    }

    const ProfileNavigationLink = () => {
        return (
            <li id="profile" className="nav-item">
                <a className="nav-link" href="/" onClick={(e) => {
                    e.preventDefault();
                    setMainPageComponent(MAINPAGE_COMPONENT.PROFILE);
                }}>Profile</a>
            </li>
        )
    }

    const MainPageHeader = () => {
        return (
            <div>
                <div className="text-center">
                    {user.firstname ? 
                        <h3>Wilkommen {user.firstname}!</h3>  : null
                    }
                </div>
                <div className="btn-group">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Menu</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <ProfileNavigationLink />
                        { user.admin ? <UserManagementNavigationLink /> : null }
                        </ul>
                    </div>
                    </nav>
                </div> 
            </div>
        )
    }

    const MainPage = () => {
        return(
            <div>
            <MainPageHeader />
            { renderMainPageComponents() }
            </div>
        )
    }

    function renderComponent() {
        switch(currentState) {
            case MAINPAGE_STATE.LOADING: 
              return <Spinner />
            case MAINPAGE_STATE.ERROR_NO_ACCESS: 
              return <NoAccess />
            case MAINPAGE_STATE.MAINPAGE:
              return <MainPage />
            case MAINPAGE_STATE.ERROR_USER_DOES_NOT_EXIST_IN_FIRESTORE:
              return <ErrorCard msg={"User with email " + authUser.email + " is authenticated, but does not exist in the Firestore Users table."} />
            case MAINPAGE_STATE.ERROR_DATABASE_CONNECTION: 
              return <ErrorMessage msg="Error connecting to database." />
            case MAINPAGE_STATE.USER_NOT_VERIFIED:
                return <ErrorCard title="Sign up successful ✅" msg={"Please check your inbox. You need to verify your email before you can use our service."} />
            default: 
              return <ErrorMessage msg="Something went wrong." />
          }
    }

    function renderMainPageComponents() {
        switch(mainPageComponent) {
            case MAINPAGE_COMPONENT.PROFILE:
                return <Profile user={user} />
            case MAINPAGE_COMPONENT.USER_MANAGEMENT: 
                return <ListUsers />
            default: 
                return null;
        }
    }
      
    return (
        <div className="container h-100 w-100">
            <div className="header">
                <Logout />
            </div>
            { renderComponent() }
        </div>
    )
}

export default Main;