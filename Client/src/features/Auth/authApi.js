import { data } from 'autoprefixer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export async function createUser(data) {
    console.log(data)
    return axios.post('/auth/register', {
        ...data
    }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
    })
}
export async function updateUser(users) {
    console.log("Received",users)
     return axios.patch(`/auth/${users.id}`, {users}).catch((err) => {
        toast.error(err.response.data.message)
    });
}
export async function loginUser(data) {
    return axios.post('/auth/login', { ...data }).catch((err) => {
        toast.error(err.response.data.message)
    })
}

export async function checkUser() {
    return axios.get('/auth/check-user').catch((err) => {
        toast.error("Server didnot respond ! Try Again ")
    })
}
export async function sellerRegister(data) {
    console.log("Invoked Seller Registration",{...data})
    return axios.post('/seller/seller-register', { ...data }).then((res) => {
        toast.success(res.data.message)
    }).catch((err) => {
        toast.error(err.response.data.message)
    })
}
export async function sellerLogin(data) {
    return axios.post('/seller/seller-login', { ...data })
}
export async function fetchSellerInfo(id) {
    return axios.get(`/seller/${id}`);
}


export function userLogout(user) {
    window.location.reload()
    return { data: 'success' };

}

export function changePassword(data) {
    console.log("Changing Password",{...data})
    return axios.post('/auth/change-password', { ...data }).then((res) => {
        toast.success(res.data.message)
        
        
    }).catch((err) => {
        toast.error(err.response.data.message)
    })
}

