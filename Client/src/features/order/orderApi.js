import axios from "axios";
// A mock function to mimic making an async request for data
export function newOrder(order) {
  console.log("new order",order)
  return axios.post(`/orders`,{...order})
}

export function orderByCard(order) {
  return axios.post(`/orders/braintree/payment`,{...order})
}
export async function fetchOrderForSeller(id) {
  return axios.get(`/orders/sellers/${id}`)

}
export async function updateOrder(data) {
  return axios.patch(`/orders/sellers/${data.id}`,{...data})
}
export async function updateRatingStatus(data) {
  console.log(data)
  return axios.patch(`/orders/rating-status/${data.id}`,{...data})
}
export async function fetchMonthelyOrder(id) {
  return  axios.get(`/orders/sellers/total-orders/${id}`);
}
