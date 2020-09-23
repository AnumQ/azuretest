import React, {useState, useEffect} from 'react';
import { db } from "./../../imalFirebase";
import DateFormatter from '../util/DateFormatter';

const ListUsers = () => {

    const [allUsers, setAllUsers] = useState([]);

    const revokeAccess = (e, uid) => {
        e.preventDefault();
        console.log("Revoke access for ", uid);

        db.collection('users').doc(uid).set({
            expirydate: new Date()
          }, { merge: true })
          .then(() => {
              loadData();
          })
          .catch((err) => {
            console.log("Error updating user to firestore " + err);
          })
    }

    function loadData() {
        var userList = [];
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} = ${doc.data().email}`);
                var data = doc.data();
                data.uid = doc.id;

                var expirydate = data.expirydate; 
                var dateNow = new Date();
                var hasAccess = expirydate.toMillis() > dateNow.getTime();
                data.hasAccess = hasAccess;
                data.isAdmin = data.admin ? "Yes" : "No"
                userList.push(data);
            });
            setAllUsers(userList);
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    const renderUser = (user, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.emailVerified ? "✅" : ""}</td>
                <td>{user.isAdmin}</td>
                <td>{DateFormatter.formatDate(user.expirydate.toDate())}</td>
                <td><button disabled={!user.hasAccess} className="btn btn-light" onClick={(e) => revokeAccess(e, user.uid)} >Steng</button></td>
            </tr>
        )
    }

    return (
        <div className="mt-3">
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">Email Verified</th>
                <th scope="col">Admin</th>
                <th scope="col">Trial expiry date</th>
                <th>Revoke access</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.length > 0 ? allUsers.map(renderUser) : null} 
            </tbody>
            </table>
        </div>
    )
}

export default ListUsers;