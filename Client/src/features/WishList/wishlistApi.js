import axios from 'axios';

export const addToWishlist = (product) => {
    return axios.post('/wishlist', { product });
}
export const fetchUserWishlist =  () => {
    return axios.get('/wishlist');
}
export const deleteWishlist =  (id) => {
    return axios.delete(`/wishlist/${id}`);
}
export const resetWishlist = () => {
    return axios.post('/wishlist/reset');
}