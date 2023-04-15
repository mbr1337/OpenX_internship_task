export const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

export const displayDistances = (usersData) => {
    const distances = [];
    for (let i = 0; i < usersData.length; i++) {
        for (let j = i + 1; j < usersData.length; j++) {
            const lat1 = parseFloat(usersData[i].address.geolocation.lat);
            const lon1 = parseFloat(usersData[i].address.geolocation.long);
            const lat2 = parseFloat(usersData[j].address.geolocation.lat);
            const lon2 = parseFloat(usersData[j].address.geolocation.long);
            const currDistance = calculateDistance(lat1, lon1, lat2, lon2);
            distances.push({
                user1: usersData[i].name.firstname + " " + usersData[i].name.lastname,
                user2: usersData[j].name.firstname + " " + usersData[j].name.lastname,
                distance: currDistance.toFixed(2)
            });
        }
    }
    return distances;
};

export const getFurthestDistance = (distances) => {
    let furthestDistance = 0;
    let furthestUser1 = "";
    let furthestUser2 = "";
    for (let i = 0; i < distances.length; i++) {
        if (parseFloat(distances[i].distance) > furthestDistance) {
            furthestDistance = parseFloat(distances[i].distance);
            furthestUser1 = distances[i].user1;
            furthestUser2 = distances[i].user2;
        }
    }
    return { furthestDistance, furthestUser1, furthestUser2 };
};