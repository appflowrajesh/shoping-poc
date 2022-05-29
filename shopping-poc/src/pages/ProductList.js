import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../context";
import { Link } from "react-router-dom";
import ModalComponent from "../components/Modal";

import axios from "axios";

import Pagination from "react-js-pagination";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../apiCalls/ProductService";
import { useSortableData } from "../hooks/useSortingData";
import AddProduct from "./AddProduct";

const ProductList = () => {
  const { productList, onSubmitProductList } = useStore();
  const [show, setShow] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const { items, requestSort, sortConfig } = useSortableData(productList);

  const resetForm = () => {
    setProductDetails({
      productName: "",
      price: "",
      imgUrl: "",
    });
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const uploadDocHandler = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("api_key", "581999827977747");
    formData.append("file", file);
    formData.append("upload_preset", "scoreinsta");
    formData.append("cloud_name", "scoreinsta");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    var instance = axios.create();
    delete instance.defaults.headers.common["Authorization"];
    instance
      .post("https://api.cloudinary.com/v1_1/scoreinsta/image/upload", formData)
      .then((res) => {
        console.log(res, "checkREsult");
        setProductDetails((prev) => ({ ...prev, imgUrl: res.data.url }));
        setUploading(false);
      })
      .catch((err) => {
        console.log(err, "checkError");
        setUploading(false);
      });
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    const { productName, price, imgUrl } = productDetails;
    const payload = { productName, price, imgUrl };
    const res = await createProduct(payload);
    console.log(res, "resData");
    if (res.status) {
      handleClose();
      getAllProductsHanlder();
      resetForm();
      toast("Product added successfully");
    }
  };

  const getAllProductsHanlder = useCallback(async () => {
    const res = await getAllProducts(page);
    console.log(res, "resData");
    if (res.status) {
      onSubmitProductList(res.data);
      setTotalItemsCount(res.totalCount);
    }
  }, [page]);

  useEffect(() => {
    getAllProductsHanlder();
  }, [getAllProductsHanlder]);

  const deleteProductHandler = async (id) => {
    const res = await deleteProduct(id);
    if (res.status) {
      getAllProductsHanlder();
      toast("Product deleted successfully");
    }
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  console.log(items, "items");

  return (
    <>
      <h2 className="title">Product List</h2>
      <div className="body">
        {productList.length === 0 ? (
          <h3 className="p-5 text-center">No Product Found</h3>
        ) : (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th
                    onClick={() => requestSort("productName")}
                    className={getClassNamesFor("productName")}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Product Name
                      {getClassNamesFor("productName") === "ascending" ? (
                        <BsSortDownAlt />
                      ) : (
                        <BsSortUpAlt />
                      )}
                    </div>
                  </th>

                  <th
                    onClick={() => requestSort("price")}
                    className={getClassNamesFor("price")}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Price
                      {getClassNamesFor("price") === "ascending" ? (
                        <BsSortDownAlt />
                      ) : (
                        <BsSortUpAlt />
                      )}
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>
                      <Link to={`/product/${item._id}`}>
                        {" "}
                        {item.productName}
                      </Link>
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => deleteProductHandler(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
      <div className="product_footer mt-4">
        <Button variant="primary" onClick={handleOpen}>
          Add New Product
        </Button>
        {productList.length > 0 && (
          <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            linkClass="page-link"
            itemClass="paginate_button page-item"
          />
        )}
      </div>

      <ModalComponent
        show={show}
        handleClose={handleClose}
        title="Add New Product"
      >
        <AddProduct
          addProductHandler={addProductHandler}
          handleChange={handleChange}
          productDetails={productDetails}
          uploadDocHandler={uploadDocHandler}
          uploading={uploading}
        />
      </ModalComponent>
      <ToastContainer />
    </>
  );
};

export default ProductList;
