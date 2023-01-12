import React, { useEffect, useState } from "react";
import { createNewProduct, updateProduct } from "../../services/apiCalls";

const ProductForm = ({productToEdit}) => {
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (productToEdit) setProduct(productToEdit);
  }, [productToEdit]);

  const handleData = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      rating: "",
      comments: [],
    }));
  };

  const createProduct = async (product) => {
    try {
      await createNewProduct(product);
    } catch (error) {
      setError(error);
    }
  };

  const updateThisProduct = async (product) => {
    try {
      await updateProduct(product);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="createProductDesign">
      <input
        className="myInput"
        type="text"
        name="name"
        value={product.name}
        id="name"
        title="name"
        placeholder="Name:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />

      <input
        className="myInput"
        type="brand"
        name="brand"
        id="brand"
        title="brand"
        placeholder="Brand:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <input
        className="myInput"
        type="model"
        name="model"
        id="model"
        title="model"
        placeholder="Model:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <input
        className="myInput"
        type="description"
        name="description"
        id="description"
        title="description"
        placeholder="Description:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <input
        className="myInput"
        type="url"
        name="url"
        id="url"
        title="url"
        placeholder="Image URL:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <div className="bottomSection">
        {productToEdit ? (
          <button
            className="designCreateProductButton"
            onClick={() => {
              updateThisProduct(product);
            }}
          >
            EDIT
          </button>
        ) : (
          <button
            className="designCreateProductButton"
            onClick={() => {
              createProduct(product);
            }}
          >
            CREATE
          </button>
        )}
      </div>
      <div>{error === "" ? null : error}</div>
    </div>
  );
};

export default ProductForm;
