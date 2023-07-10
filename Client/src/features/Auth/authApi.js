import axios from 'axios';

export function createUser({email, password, address, gender, phone, fullName}) {
    console.log(email, password, address, gender, phone, fullName)
 return axios.post('http://localhost:8080/users',{email,password,address,gender,phone,fullName})
}
