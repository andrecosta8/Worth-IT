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
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="showProducts">
      {!searchProducts
        ? products.map((product) => {
            return (
              <ProductCard key={product.id}
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
              return <ProductCard key={filteredProduct.id} product={filteredProduct} />;
            })}
    </div>
  );
};

export default ShowProducts;
