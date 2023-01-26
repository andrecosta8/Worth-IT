/* eslint-disable react-hooks/exhaustive-deps */
import "./ShowProducts.css";
import ProductCard from "../ProductCard/ProductCard";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/apiCalls";

const ShowProducts = ({ searchProducts }) => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsList();
  }, []);

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
              <ProductCard
                key={product.id}
                product={product}
                getProductsList={getProductsList}
              />
            );
          })
        : products
            .filter((products) =>
              products.name
                .toLowerCase()
                .includes(searchProducts.trim().toLowerCase())
            )
            .map((filteredProduct) => {
              return (
                <div id="productCard">
                  {" "}
                  <ProductCard
                    key={filteredProduct.id}
                    product={filteredProduct}
                  />{" "}
                </div>
              );
            })}
    </div>
  );
};

export default ShowProducts;
