import React from 'react';
import '../util/DateFormatter'
import DateFormatter from '../util/DateFormatter';

const Profile = (props) => {

    const { user } = props;

    return (
        <div>
            { user ? 
            <div className="profile">
                <p><b>Name</b> <label>{user.firstname} {user.lastname}</label></p>
                <p><b>Admin</b> <label>{user.admin ? "yes" : "no"}</label></p>
                <p><b>Email</b> <label>{user.email}</label></p>
                <p><b>Trial ends: </b> <label>{DateFormatter.formatDate(user.expirydate.toDate())}</label></p>
            </div> : null }
        </div>
    )
}

export default Profile;