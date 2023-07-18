import axios from "axios";

// A mock function to mimic making an async request for data
export function addToCart(item) {
  console.log("lulululuul",item)
  return axios.post(`http://localhost:8080/cart`,{...item})
}
