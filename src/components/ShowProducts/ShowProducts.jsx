import "./ShowProducts.css";
import ProductCard from "../ProductCard/ProductCard";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/apiCalls";

const ShowProducts = ({ searchProducts }) => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsList();
  },[]);

  const getProductsList = async () => {
    try {
      let response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError(err);
      console.error(error);
    }
  };

  return (
    <div className="showProducts">
      {!searchProducts
        ? products.map((product) => {
            return (
              <div key={product.id}  id="productCard">
                  <ProductCard
               product={product}
               getProductsList={getProductsList}
                  />
                </div>
            );
          })
        : products
            .filter((products) =>
              products.name
                .toLowerCase()
                .includes(searchProducts.trim().toLowerCase())
            )
            .map((filteredProduct) => {
              return <div id="productCard"> <ProductCard key={filteredProduct.id} product={filteredProduct} /> </div>; 
            })}
    </div>
  );
};

export default ShowProducts;
