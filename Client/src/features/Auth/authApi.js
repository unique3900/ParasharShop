import { data } from 'autoprefixer';
import axios from 'axios';
import toast from 'react-hot-toast';

export async function createUser(data) {
    console.log(data)
    return axios.post('http://localhost:8080/auth/register', {
       ...data
    }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
    })
}
export async function updateUser(users) {
    console.log("Received",users)
     return axios.patch(`http://localhost:8080/users/${users.id}`, users).catch((err) => {
        toast.error(err.response.data.message)
    });
}
export async function loginUser(data) {
    return axios.post('http://localhost:8080/auth/login', { ...data }).catch((err) => {
        toast.error(err.response.data.message)
    })
}

export async function sellerLogin({data}) {
    // console.log("My data", data.user);
    const getUser = await axios.get('http://localhost:8080/auth?email=' + data.user.email);
    if (getUser.data.length>0) {
        if (getUser.data[0].businessInfo.businessPassword == data.password) {
            // console.log("Valid Password",getUser.data[0])
            toast.success("Seller Validated!")
            return {data:getUser.data[0]}
        }
        else {
            // console.log("InValid Password")
            toast.error("Invalid Password!")
            return {data:null}
        }
    }
    else {
        // console.log("User Doesnot Exist")
        toast.error("Seller Doesnot Exist!")
        return {data:null}
    }
}


export function userLogout(user) {
    return { data: 'success' };
}

export function changePassword(user) {
    return { data: 'success' };
}

