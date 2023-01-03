import React, { useEffect, useState } from "react";
import "./Products.css";
import { getProducts } from "../../services/apiCalls";
import ProductCard from "../../components/ProductCard/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      let result = await getProducts();
      setProducts(result.data);
    })();
  }, []);

  return (
    <div className="productsPageDesign">
      {products.map((product) => {
        return(
        <ProductCard product={product} />
        )
      })}
    </div>
  );
};

export default Products;
