import axios from "axios";

export async function addUserAddress(data) {
    console.log(data);
    return await axios.post('http://localhost:8080/address', { ...data });
}

export async function fetchUserAddress(id) {
    console.log("Address Fetching"+id);
    return await axios.get(`http://localhost:8080/address/${id}`);
}