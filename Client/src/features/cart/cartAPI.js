import axios from "axios";
import { getCartByEmailAsync } from "./cartSlice";
import toast from "react-hot-toast";

// A mock function to mimic making an async request for data
export function addToCart(items) {
  console.log("lulululuul", items)
  return axios.post(`/cart`,{...items})
}
export async function getCartByUserEmail() {
  const response=await axios.get(`/cart/`);
  return response.data;
}
export function removeFromCart(id) {
  return axios.delete(`/cart/${id}`)
}

export async function resetCart() {

  return axios.post('/cart/reset');

}
export function updateCart(items) {
  return axios.patch(`/cart/${items.id}`,{...items})
}