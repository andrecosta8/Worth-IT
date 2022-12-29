import React, { useEffect, useState } from "react";
import "./Products.css";
import { getProducts } from "../../services/apiCalls";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      let result = await getProducts();
      setProducts(result.data);
    })();
  }, []);

  return (
    <div>
      {products.map((elem) => {
        return (
          <div key={elem.id}>
            <div>{elem.name}</div>
            <div>{elem.brand}</div>
            <div>{elem.model}</div>
            <div>{elem.description}</div>
            <img className= "productImage" src={elem.url} alt={elem.name}></img>
            <div>{elem.rating}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
