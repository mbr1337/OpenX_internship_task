import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDistances, getFurthestDistance } from '../utils/distanceUtils';
import '../styles/userDataStyle.scss';
import { usersApi } from "../api/apiEndpoints";
const UserData = () => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(usersApi)
            .then((response) => {
                setUsersData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setLoading(true);
            });
    }, []);

    const distances = displayDistances(usersData);
    const { furthestDistance, furthestUser1, furthestUser2 } = getFurthestDistance(distances);

    return (
        <section id="userData">
            {loading ? (
                <div>Loading User data...</div>
            ) : (
                <>
                    <h2><u>Users data</u></h2>
                    <div id="all_users_data">
                        {usersData?.length > 0 && (
                            <table className="user-data-table">
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
                                        <th>Longitude</th>
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
                        )}
                    </div>

                    <div id="all_users_distances">
                        <h2><u>Distances between Users</u></h2>
                        {distances && distances.length > 0 && (
                            <div>
                                <table className="distance-table">
                                    <thead>
                                        <tr>
                                            <th>User 1</th>
                                            <th>User 2</th>
                                            <th>Distance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {distances.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.user1}</td>
                                                <td>{data.user2}</td>
                                                <td>{data.distance} km</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <h1><u>Furthest Distance</u></h1>
                        {furthestDistance && (
                            <div>
                                <p>
                                    The furthest distance is between {furthestUser1} and {furthestUser2}: {furthestDistance} km
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default UserData;
