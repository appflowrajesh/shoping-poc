import isEmpty from "is-empty";
import React from "react";
import { Button } from "react-bootstrap";
import CustomInput from "../components/Input";
import UploadFile from "../components/UploadFile";

const AddProduct = ({
  addProductHandler,
  handleChange,
  productDetails,
  uploadDocHandler,
  uploading,
}) => {
  return (
    <>
      <form onSubmit={addProductHandler}>
        <CustomInput
          type="text"
          onChange={handleChange}
          value={productDetails?.productName}
          placeholder={"Product Name"}
          name="productName"
          autoComplete="off"
          required
        />
        <CustomInput
          type="text"
          onChange={handleChange}
          placeholder={"Price"}
          value={productDetails?.price}
          name="price"
          autoComplete="off"
          required
        />
        <UploadFile
          onDrop={(files) => {
            uploadDocHandler(files[0]);
          }}
          accept="image/*"
          uploading={uploading}
          file={productDetails.imgUrl}
        />
        <Button
          variant="primary"
          className="w-100 mt-4"
          type="submit"
          disabled={uploading || isEmpty(productDetails.imgUrl)}
        >
          Add
        </Button>
      </form>
    </>
  );
};

export default AddProduct;
