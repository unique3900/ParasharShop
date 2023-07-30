import axios from "axios";
// A mock function to mimic making an async request for data
export function newOrder(order) {
  return axios.post(`http://localhost:8080/orders`,{...order})
}
