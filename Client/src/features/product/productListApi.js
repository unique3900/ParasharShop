import axios from 'axios';

export function fetchAllProducts() {
    return axios.get('http://localhost:8080/products')    
}

export function fetchProductsByFilter(filter) {
    // let queryString = 'category=smartphones ';
    console.log("heueue",filter)
    let queryString = '';
    for (let key in filter) {
        queryString += `${key}=${filter[key]}&`
    }
    console.log("ququq",queryString)  
    return axios.get(`http://localhost:8080/products?${queryString}`)    
}