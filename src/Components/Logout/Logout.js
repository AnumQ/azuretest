import React from 'react';
import { auth } from "./../../imalFirebase";

const Logout = () => {

    const handleLogout = (e) => {
        e.preventDefault();
        auth.signOut();
    };

    return (
        <span><a href="/" id="logoutBtn" className="btn btn-link" type="submit" onClick={(e) => handleLogout(e)}>Logout</a></span>
    )
}

export default Logout;