import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function fetchAllProducts() {
    return axios.get('/products')    
}
export function fetchProductById(id) {
    return axios.get(`/products/${id}`)
}
export function searchProduct(searchQuery) {
    const queryString = `keyword=${searchQuery}&`;
    return axios.get(`/products/search?${queryString}`);
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
    return axios.get(`/products?${queryString}`)    


}
export function createProduct(product) {
    console.log("Received New Product", product);
    return axios.post(`/products`, { ...product })
   
}
export function updateProductRating(data) {
    return axios.post('/products/rating',{...data})
}
export function updateProduct(data) {
    console.log("Received New Product", data);
    return axios.patch(`/products/${data.id}`, {...data})
}
export async function deleteProduct(id) {
    return axios.delete(`/products/${id}`);
}
export function fetchProductBySellerId(id) {
    console.log("Received Seller Id", id);
    return axios.get(`/products/seller/${id}`)
}

export function fetchAllBrands() {
    return axios.get('/brands')
}
export function fetchAllCategory() {
    return axios.get('/category')
}

export function fetchMonthelyProducts(id) {
    return axios.get(`/products/seller/total-product/${id}`)
}

export function fetchProductRecommendation(id) {
    return axios.get(`/recommend/${id}`);
}