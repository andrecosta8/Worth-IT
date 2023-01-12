import React, { useState } from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import { createNewProduct } from "../../services/apiCalls";
import "./CreateProduct.css";

const CreateProduct = ({productToEdit}) => {
  return (
    <ProductForm productToEdit={productToEdit} />
  );
};

export default CreateProduct;
