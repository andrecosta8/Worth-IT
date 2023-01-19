import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
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
    <div className="productsManagement">
      {form === true ? (
       <ProductForm
       productToEdit={productToEdit}
       toggleForm={toggleForm}
       getProductsList={getProductsList}
     />
      ) : (
        <>
        <div className="headerProductsManagement">
          <Button className="createNewProductButton" variant="contained" color="primary" size="small" onClick={() => toggleForm()} >Create New Product</Button>
          <span className="title">LIST OF PRODUCTS:</span>
        </div>
         <div className="productsList">
         {products.map((product) => {
           return (
             <div id="productCard">
               <ProductCard product={product} toggleForm={toggleForm} deleteThisProduct={deleteThisProduct} />
               {/* <button onClick={() => toggleForm(product)}>EDIT</button>
               <button onClick={() => deleteThisProduct(product)}>DELETE</button> */}
             </div>
           );
         })}
         </div>
        </>
      )}
      
   
    </div>
  );
};

export default ProductsManagement;
