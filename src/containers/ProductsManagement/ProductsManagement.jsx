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
    try {
      let response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteThisProduct = async (product) => {
    try {
      await deleteProduct(product);
      getProductsList();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleForm = (product) => {
    setProductToEdit(product);
    setForm(!form);
  };
  return (
    <div className="adminDesign">
      {form === true ? (
        <button onClick={() => toggleForm()}>Close</button>
      ) : (
        <button onClick={() => toggleForm()}>Create New Product</button>
      )}
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
