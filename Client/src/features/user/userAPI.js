import { data } from 'autoprefixer';
import axios from 'axios';

export async function fetchLoggedInUserInfo(id) {
    return axios.get(`http://localhost:8080/auth/${id}`)
    // return {data: getUser.data[0]}
}

export function fetchLoggedInUserOrders(id) {
    return axios.get(`http://localhost:8080/orders/${id}`)
}

export function updateUserInfo(users) {
    console.log("Received",users)
     return axios.patch(`http://localhost:8080/users/${users.id}`, users);
}
