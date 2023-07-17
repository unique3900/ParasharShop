import axios from 'axios';

export function fetchAllProducts() {
    return axios.get('http://localhost:8080/products')    
}
export function fetchProductById(id) {
    return axios.get(`http://localhost:8080/products/${id}`)
}
export function fetchProductsByFilter(filter,sort) {
    // let queryString = 'category=smartphones ';
    // console.log("heueue",filter)
    let queryString = '';
    for (let key in filter) {
        let categoryValues = filter[key];
        if (categoryValues.length) {
            const lastCatVal = categoryValues[categoryValues.length - 1];
            queryString += `${key}=${lastCatVal}&`
        }
    }

    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
    }
    console.log("ququq",queryString)  
    return axios.get(`http://localhost:8080/products?${queryString}`)    
}

export function fetchAllBrands() {
    return axios.get('http://localhost:8080/brands')
}
export function fetchAllCategory() {
    return axios.get('http://localhost:8080/category')
}