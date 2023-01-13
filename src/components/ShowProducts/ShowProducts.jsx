import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/apiCalls";
import ProductCard from "../ProductCard/ProductCard";
import "./ShowProducts.css";

const ShowProducts = ({ searchProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = async () => {
    let response = await getAllProducts();
    setProducts(response.data);
  };

  return (
    <div>
      {!searchProducts
        ? products.map((product) => {
            return (
              <ProductCard
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
              return <ProductCard product={filteredProduct} />;
            })}
    </div>
  );
};

export default ShowProducts;
