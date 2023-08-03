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
export function createProduct(product) {
    console.log("Received New Product", product);
    return axios.post(`http://localhost:8080/products`, { ...product })
   
}
export function updateProduct(data) {
    console.log("Received New Product", data);
    return axios.patch(`http://localhost:8080/products/${data.id}`, {...data})
}
export function deleteProduct(id) {
    console.log("Received Delete Id", id);
    return axios.delete(`http://localhost:8080/products/${id}`)
}
export function fetchProductBySellerId(id) {
    console.log("Received Seller Id", id);
    return axios.get(`http://localhost:8080/products?seller=${id}`)
}

export function fetchAllBrands() {
    return axios.get('http://localhost:8080/brands')
}
export function fetchAllCategory() {
    return axios.get('http://localhost:8080/category')
}