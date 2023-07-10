import { data } from 'autoprefixer';
import axios from 'axios';

export function createUser({
    email,
    password,
    address,
    gender,
    phone,
    fullName
}) {
    console.log(email, password, address, gender, phone, fullName)
    return axios.post('http://localhost:8080/users', {
        email,
        password,
        address,
        gender,
        phone,
        fullName
    })
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
            console.log("Valid Password")
            return getUser
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
