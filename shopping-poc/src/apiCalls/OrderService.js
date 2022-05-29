import axios from "axios";

export const createOrder = async (payLoad) => {
  try {
    const { data } = await axios.post(`order/create`, payLoad);
    return data;
  } catch (err) {
    return err;
  }
};
export const getAllOrders = async (page) => {
  try {
    const { data } = await axios.get(`order/all?page=${page}&limit=5`);
    return data;
  } catch (err) {
    return err;
  }
};
