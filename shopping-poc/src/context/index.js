import React, { createContext, useContext, useEffect } from "react";

import { useState } from "react";
import { orderListJson, productListJson } from "../utils";

const GlobalContext = createContext();

export function useStore() {
  return useContext(GlobalContext);
}

export default function StoreProvider({ children }) {
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);

  const onSubmitOrderList = (data) => {
    setOrderList(data);
  };
  const onSubmitProductList = (data) => {
    setProductList(data);
  };
  const onSubmitAddProduct = (data) => {
    setProductList([...data, ...productList]);
  };
  const onSubmitAddOrder = (data) => {
    setOrderList([...data, ...orderList]);
  };

  const values = {
    orderList,
    productList,
    onSubmitOrderList,
    onSubmitProductList,
    onSubmitAddProduct,
    onSubmitAddOrder,
  };
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
