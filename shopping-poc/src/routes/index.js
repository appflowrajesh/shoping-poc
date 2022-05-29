import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import NewOrder from "../pages/NewOrder";
import OrderList from "../pages/OrderList";
import ProductList from "../pages/ProductList";

const RoutesComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/*">
              <Route index element={<ProductList />} />
              <Route path="product/:id" element={<NewOrder />} />
              <Route path="order-list" element={<OrderList />} />
              <Route path="product-list" element={<ProductList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RoutesComponent;
