import axios from "axios";

export async function addUserAddress(data) {
    console.log(data);
    return await axios.post('/address', { ...data });
}

export async function fetchUserAddress() {
    return await axios.get(`/address`);
}

export async function deleteUserAddress(id) {
    console.log("Deleting",id)
    return await axios.delete(`/address/${id}`);
}
export async function updateUserAddress(address) {
   console.log("Update Invoked",{...address})
    return await axios.patch(`/address/${address.id}`,{...address})
}