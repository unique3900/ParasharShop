import axios from "axios";
import { getCartByEmailAsync } from "./cartSlice";

// A mock function to mimic making an async request for data
export function addToCart(items) {
  console.log("lulululuul", items)
  
  return axios.post(`http://localhost:8080/cart`,{...items})
}
export function getCartByUserEmail(email) {

  return axios.get(`http://localhost:8080/cart?user=${email}`)
}
export function removeFromCart(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`)
}
export function updateCart(items) {
  return axios.patch(`http://localhost:8080/cart/${items.id}`,{...items})
}