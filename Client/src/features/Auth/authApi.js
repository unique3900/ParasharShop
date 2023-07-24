import { data } from 'autoprefixer';
import axios from 'axios';

export function createUser({
    email,
    password,
    address,
    gender,
    phone,
    fullName,
    addresses
}) {
    console.log(email, password, address, gender, phone, fullName,addresses)
    return axios.post('http://localhost:8080/users', {
        email,
        password,
        address,
        gender,
        phone,
        fullName,
        addresses
    })
}
export function updateUser(users) {
    console.log("Received",users)
     return axios.patch(`http://localhost:8080/users/${users.id}`, users);
}
export async function loginUser({
    email,
    password
}) {
    const getUser = await axios.get('http://localhost:8080/users?email=' + email);
    console.log(getUser.data.length)
    if (getUser.data.length > 0) {
        // console.log(password,getUser.data[0].password)
        if (getUser.data[0].password == password) {
            console.log("Valid Password",getUser.data[0])
            return {data:getUser.data[0]}
        }
        else {
            console.log("InValid Password",getUser.data.password,password)
            return {data:null}
        }
       
    }
    else {
        console.log("User Doesnot Exist")
        return {data:null}
    }
    
}
