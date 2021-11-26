import axios from "axios";

export const getUser = async (email) => {
    try {
        const response = await axios.get(`https://food-ping.herokuapp.com/getUser?email=${email}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const addUser = async(email) => {
    try {
        const response = await axios.post(`https://food-ping.herokuapp.com/addUser?email=${email}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const searchItem = async () => {
    try {
        const response = await axios.get(`https://food-ping.herokuapp.com/searchItem`, {
            params: { item: "fresh" },
          });
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getGrocery = async (user_id) => {
    try {
        const response = await axios.get(`https://food-ping.herokuapp.com/getGroceries?user_id=${user_id}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getInventory = async(user_id) => {
    try {
        const response = await axios.get(`https://food-ping.herokuapp.com/getInventory?user_id=${user_id}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    } 
}

export const addGrocery = async(user_id, item_name, query_id) => {
    try {
        const response = await axios.post(`https://food-ping.herokuapp.com/addGroceryItem?user_id=${user_id}&item_name=${item_name}&query_id=${query_id}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    } 
}

export const editGroceryTag = async(user_id, item_id, tag) => {
    try {
        const response = await axios.put(`https://food-ping.herokuapp.com/editGroceryTag?tag=${tag}&user_id=${user_id}&item_id=${item_id}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    } 
}

export const editDisplayTag = async(user_id, item_id, tag) => {
    try {
        const response = await axios.put(`https://food-ping.herokuapp.com/editDisplayTag?tag=${tag}&user_id=${user_id}&item_id=${item_id}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const editInventoryTag = async(user_id, item_id, tag) => {
    try {
        const response = await axios.put(`https://food-ping.herokuapp.com/editInventoryTag?tag=${tag}&user_id=${user_id}&item_id=${item_id}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    } 
}

export const editUsageTag = async(user_id, item_id, tag) => {
    try {
        const response = await axios.put(`https://food-ping.herokuapp.com/editUsageTag?tag=${tag}&user_id=${user_id}&item_id=${item_id}`);
        const json = await response.data;
        return json;
    } catch (error) {
        console.error(error);
    }
}