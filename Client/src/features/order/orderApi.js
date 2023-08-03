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
export async function updateOrder(data) {
  console.log("Received for Update",data);
  const product = await axios.get(`http://localhost:8080/orders/${data.order.id}`);
 

  
  const indxedProduct = product.data.items[data.index];
  indxedProduct.status = data.value;
  const updatedOrder = { ...data.order, items: product.data.items };
  return axios.patch(`http://localhost:8080/orders/${data.order.id}`,{...updatedOrder})
  

}
