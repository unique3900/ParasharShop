import axios from "axios";
// A mock function to mimic making an async request for data
export function newOrder(order) {
  console.log("new order",order)
  return axios.post(`http://localhost:8080/orders`,{...order})
}
export async function fetchOrderForSeller(id) {
  const data = [];
  const res = await axios.get(`http://localhost:8080/orders`);
  const fetchData = res.data;
  fetchData.map((itemss) => {
    itemss.items.map((kk) => {
      kk.seller==id&&data.push(itemss)
  })
  })
  return {data};

}
export function updateOrder(order) {
  console.log("Received for Update",order);
  return axios.patch(`http://localhost:8080/orders/${order.id}`,{...order})

}
