import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { getProducts } from "../../services/apiCalls";
import ProductCard from "../../components/ProductCard/ProductCard";
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {navigate("/login")}
    (async () => {
      let result = await getProducts();
      setProducts(result.data);
    })();
  }, []);


  return (
    <div className="productsPageDesign">
      {/* <div>
        <input
        name="food"
        placeholder="Search your meal..."
        className="searchInput"
        onChange={(e) => inputSearchHandler(e)}
      />
      </div> */}
      {products.map((product) => {
        return(
        <ProductCard product={product} />
        )
      })}
    </div>
  );
};

export default Products;
