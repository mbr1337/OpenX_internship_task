const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};


const findFurthestUsers = (usersData) => {
    let maxDistance = -1;
    let user1 = null;
    let user2 = null;
    let distance = 0; // Initialize distance variable
    for (let i = 0; i < usersData.length; i++) {
        for (let j = i + 1; j < usersData.length; j++) {
            const lat1 = parseFloat(usersData[i].address.geolocation.lat);
            const lon1 = parseFloat(usersData[i].address.geolocation.long);
            const lat2 = parseFloat(usersData[j].address.geolocation.lat);
            const lon2 = parseFloat(usersData[j].address.geolocation.long);
            const currDistance = calculateDistance(lat1, lon1, lat2, lon2);
            if (currDistance > maxDistance) {
                maxDistance = currDistance;
                user1 = usersData[i];
                user2 = usersData[j];
                distance = maxDistance.toFixed(2);
            }
        }
    }
    // Return user1, user2, and distance as an object
    return { user1, user2, distance };
};

export { calculateDistance, findFurthestUsers };