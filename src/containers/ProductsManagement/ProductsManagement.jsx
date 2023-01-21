import "./ProductsManagement.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductForm from "../../components/ProductForm/ProductForm";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Button } from "@mui/material";
import { getAllProducts, deleteProduct } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const ProductsManagement = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    if (!admin) navigate("/");
  });

  const getProductsList = async () => {
    try {
      let response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const deleteThisProduct = (product) => {
    try {
      deleteProduct(product);
      getProductsList();
    } catch (error) {
      setError(error);
    }
  };

  const toggleForm = (product) => {
    setProductToEdit(product);
    setForm(!form);
  };

  return (
    <div className="productsManagement">
      {form ? (
        <ProductForm
          productToEdit={productToEdit}
          toggleForm={toggleForm}
          getProductsList={getProductsList}
        />
      ) : (
        <>
          <div className="headerProductsManagement">
            <Button
              className="createNewProductButton"
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                setTimeout(() => {
                  toggleForm();
                }, 250)
              }
            >
              Create New Product
            </Button>
          </div>
          <div className="productsList">
            {products.map((product) => {
              return (
                <div key={product.id}  id="productCard">
                  <ProductCard
                    product={product}
                    toggleForm={toggleForm}
                    deleteThisProduct={deleteThisProduct}
                  />
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
