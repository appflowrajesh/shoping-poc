import React, { useCallback, useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createOrder } from "../apiCalls/OrderService";
import { getProductById } from "../apiCalls/ProductService";
import Skeleton from "react-loading-skeleton";

const NewOrder = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [counter, setCounter] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  const getProductByIdHanlder = useCallback(async () => {
    setLoading(true);
    const res = await getProductById(id);

    if (res.status) {
      setProductDetails(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getProductByIdHanlder();
  }, [getProductByIdHanlder]);

  const createOrderHandler = async () => {
    const { price } = productDetails;
    const payload = {
      amount: price,
      qty: counter,
      productId: id,
    };
    const res = await createOrder(payload);
    console.log(res);
    if (res.status) {
      toast(res.message);
      setTimeout(() => {
        navigate("/order-list");
      }, 1000);
    }
  };

  return (
    <>
      <div className="product_wrap">
        <div className="product_image">
          {loading ? (
            <Skeleton height={420} />
          ) : (
            <img
              src={`${productDetails?.imgUrl}`}
              alt={productDetails?.productName}
            />
          )}
        </div>
        <div className="product_details">
          {loading ? (
            <Skeleton height={20} count={2} />
          ) : (
            <>
              <h2 className="product_name">{productDetails?.productName}</h2>
              <h3 className="product_price">₹{productDetails?.price}</h3>
            </>
          )}
          <InputGroup className="mb-3 quantity_group">
            <InputGroup.Text onClick={decrementCounter}>-</InputGroup.Text>
            <FormControl
              value={counter}
              aria-label="Amount (to the nearest dollar)"
              readOnly
            />

            <InputGroup.Text onClick={incrementCounter}>+</InputGroup.Text>
          </InputGroup>
          <Button
            variant="primary"
            size="lg"
            className="w-100 mt-5"
            onClick={createOrderHandler}
          >
            Order
          </Button>{" "}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default NewOrder;
