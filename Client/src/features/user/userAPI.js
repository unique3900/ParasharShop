import { data } from 'autoprefixer';
import axios from 'axios';

export async function fetchLoggedInUserInfo() {
    return axios.get(`http://localhost:8080/auth/own`)
    // return {data: getUser.data[0]}
}

export function fetchLoggedInUserOrders() {
    return axios.get(`http://localhost:8080/orders/own`)
}

export function updateUserInfo(users) {
    console.log("Received",users)
     return axios.patch(`http://localhost:8080/users/${users.id}`, users);
}
