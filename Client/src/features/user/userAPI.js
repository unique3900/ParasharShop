import { data } from 'autoprefixer';
import axios from 'axios';

export async function fetchLoggedInUserInfo() {
    return axios.get(`/auth/own`)
    // return {data: getUser.data[0]}
}

export function fetchLoggedInUserOrders() {
    return axios.get(`/orders/own`)
}

export function updateUserInfo(users) {
    console.log("Received",users)
     return axios.patch(`/users/${users.id}`, users);
}
