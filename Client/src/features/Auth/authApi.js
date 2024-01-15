import { data } from 'autoprefixer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function checkIfUser() {
    const cookies = document.cookie.split(';');

    console.log(cookies)
  // Iterate over the cookies
  for (const cookie of cookies) {
    // Split each cookie into its name and value
    const [cookieName, cookieValue] = cookie.trim().split('=');


    // Check if the current cookie is the one with the specified name ('jwt')
    if (cookieName === 'jwt') {
      // Return the decoded value of the 'jwt' cookie
      return {token:decodeURIComponent(cookieValue)} 
    }
  }
    
}

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
        toast.success(res.data.message);

    }).catch((err) => {
        toast.error(err.response.data.message)
    })
}
export async function sellerLogin(data) {
    return axios.post('/seller/seller-login', { ...data }).catch((err) => {
        toast.error(err.response.data.message)
    })
}

export async function fetchSellerInfo() {
    return axios.get(`/seller/own`);
}


export async function handleRemoveToken() {
    document.cookie = 'jwt' + '=; Path=/;  Domain=' + location.host + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure'
    return { token: null };
}

export async function  changePassword(data) {
    console.log("Changing Password",{...data})
    return axios.post('/auth/change-password', { ...data }).then((res) => {
        toast.success(res.data.message)
    }).catch((err) => {
        toast.error(err.response.data.message)
    })
}

export async function changeSellerPassword(data) {
    return axios.post('/seller/change-password', { ...data }).then((res) => {
        toast.success(res.data.message)
    }).catch((err) => {
        toast.error(err.response.data.message)
    })
}

