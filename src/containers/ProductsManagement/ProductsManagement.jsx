import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";
import { AuthContext } from "../../providers/AuthProvider";
import { getAllProducts, deleteProduct } from "../../services/apiCalls";
import "./ProductsManagement.css";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState({});
  const [form, setForm] = useState(false);
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    if (admin === null) navigate("/");
  });

  const getProductsList = async () => {
    let response = await getAllProducts();
    setProducts(response.data);
  };

  const deleteThisProduct = (product) => {
    deleteProduct(product);
    getProductsList();
  };

  const toggleForm = (product) => {
    setProductToEdit(product);
    console.log(productToEdit);
    setForm(!form);
  };
  return (
    <div className="adminDesign">
      {form === true ? <button onClick={() => toggleForm()}>Close</button> : <button onClick={() => toggleForm()}>Create New Product</button>}
      {form === true ? (
        <ProductForm
          productToEdit={productToEdit}
          toggleForm={toggleForm}
          getProductsList={getProductsList}
        />
      ) : null}
      <div>LIST OF PRODUCTS:</div>
      {products.map((product) => {
        return (
          <div>
            <div>{product.name}</div>
            <button onClick={() => toggleForm(product)}>EDIT</button>
            <button onClick={() => deleteThisProduct(product)}>DELETE</button>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsManagement;
