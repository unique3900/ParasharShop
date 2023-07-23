import { data } from 'autoprefixer';
import axios from 'axios';

export function fetchLoggedInUserInfo(userId) {
    return axios.get(`http://localhost:8080/users?id=${userId}`)
}

export function fetchLoggedInUserOrders(userId) {
    return axios.get(`http://localhost:8080/orders?user.id=${userId}`)
}
