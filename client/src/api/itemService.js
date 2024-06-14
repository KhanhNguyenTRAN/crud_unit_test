import axios from 'axios';

const API_URL = 'http://localhost:8000/api/items';

export const getAllItems = async () => {
    return await axios.get(API_URL);
};

export const getItemById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createItem = async (item) => {
    return await axios.post(API_URL, item);
};

export const updateItem = async (id, item) => {
    return await axios.put(`${API_URL}/${id}`, item);
};

export const deleteItem = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
