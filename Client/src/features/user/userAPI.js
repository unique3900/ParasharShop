import { data } from 'autoprefixer';
import axios from 'axios';

export async function fetchLoggedInUserInfo(userId) {
    return axios.get(`http://localhost:8080/users?id=${userId}`)
    // return {data: getUser.data[0]}
}

export function fetchLoggedInUserOrders(userId) {
    return axios.get(`http://localhost:8080/orders?user.id=${userId}`)
}

export function updateUserInfo(users) {
    console.log("Received",users)
     return axios.patch(`http://localhost:8080/users/${users.id}`, users);
}
