import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/apiCalls";
import ProductCard from "../ProductCard/ProductCard";
import './SearchProducts.css'

const SearchProducts = ({ searchProducts }) => {
  const [products, setProducts] = useState([]);

  const getProductsList = async () =>{
    let response = await getAllProducts()
    setProducts(response.data)
  }

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div>
      {!searchProducts
        ? products.map((product) => {
            return <ProductCard product={product} getProductsList={getProductsList} />;
          })
        : products
            .filter((products) =>
              products.name.toLowerCase().includes((searchProducts.trim()).toLowerCase())
            )
            .map((filteredProduct) => {
              return <ProductCard product={filteredProduct} getProductsList={getProductsList}  />;
            })}
    </div>
  );
};

export default SearchProducts;
