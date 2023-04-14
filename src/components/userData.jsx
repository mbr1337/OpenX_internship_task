import React, { useEffect, useState } from "react";
import axios from "axios";
import { calculateDistance, findFurthestUsers } from '../utils/harvesineFormula';

const UserData = () => {
    const usersApi = `https://fakestoreapi.com/users`;
    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        axios
            .get(usersApi)
            .then((response) => {
                setUsersData(response.data);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, [usersApi]);

    let furthestUsers = [];
    let distance = 0;
    if (usersData.length > 0) {
        furthestUsers = findFurthestUsers(usersData);
        if (furthestUsers.length >= 2) {
            distance = calculateDistance(
                furthestUsers[0]?.address?.geolocation?.lat,
                furthestUsers[0]?.address?.geolocation?.long,
                furthestUsers[1]?.address?.geolocation?.lat,
                furthestUsers[1]?.address?.geolocation?.long
            );
        }
    }
    // Adding checks to prevent the reading properties of undefined.

    return (
        <section id="userData">
            <h2><u>Users data</u></h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>Number</th>
                        <th>Zipcode</th>
                        <th>Latitude</th>
                        <th>Longtitude</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.name.firstname}</td>
                            <td>{user.name.lastname}</td>
                            <td>{user.phone}</td>
                            <td>{user.address.city}</td>
                            <td>{user.address.street}</td>
                            <td>{user.address.number}</td>
                            <td>{user.address.zipcode}</td>
                            <td>{user.address.geolocation.lat}</td>
                            <td>{user.address.geolocation.long}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id="furthest_users">
                <h1>Furthest Users</h1>
                {furthestUsers && furthestUsers.user1 && furthestUsers.user2 && (
                    <p>
                        User 1: {furthestUsers.user1.name.firstname} {furthestUsers.user1.name.lastname}
                        <br />
                        User 2: {furthestUsers.user2.name.firstname} {furthestUsers.user2.name.lastname}
                        <br />
                        Distance: {furthestUsers.distance} km 
                    </p>
                )}
            </div>
        </section>
    );
};

export default UserData;
