import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { getAllProducts } from "../../services/apiCalls";
import "./ProductsManagement.css";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  const getProductsList = async () => {
    let response = await getAllProducts();
    setProducts(response.data);
  };

  useEffect(() => {
    getProductsList();
  }, []);
  return (
    <div className="adminDesign">
      <div>LIST OF PRODUCTS:</div>
      <button
        onClick={() =>
          setTimeout(() => {
            navigate("/admin/createproduct");
          }, 250)
        }
      >
        Create New Product
      </button>
      {products.map((product) => {
        return (
          <div>
            <div>{product.name}</div>
            <button>EDIT</button>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsManagement;
