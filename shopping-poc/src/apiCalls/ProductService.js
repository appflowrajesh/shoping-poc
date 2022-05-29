import axios from "axios";

export const createProduct = async (payLoad) => {
  try {
    const { data } = await axios.post(`product/create`, payLoad);
    return data;
  } catch (err) {
    return err;
  }
};
export const getAllProducts = async (page) => {
  try {
    const { data } = await axios.get(`product/all?page=${page}&limit=5`);
    return data;
  } catch (err) {
    return err;
  }
};
export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`product/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
export const searchProduct = async (query) => {
  try {
    const { data } = await axios.get(`product/searchProduct/${query}`);
    return data;
  } catch (err) {
    return err;
  }
};
export const deleteProduct = async (id) => {
  try {
    const { data } = await axios.delete(`product/deleteProduct/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
