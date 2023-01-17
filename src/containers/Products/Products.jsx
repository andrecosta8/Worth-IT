import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import  ShowProducts  from "../../components/ShowProducts/ShowProducts";

const Products = () => {
  const [searchProducts, setSearchProducts] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/");
  });

  const inputSearchHandler = (e) => {
    let timeOutId;
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      setSearchProducts(e.target.value);
    }, 500);
  };

  return (
    <div className="productsPageDesign">
      <div class="wave"></div><div class="wave"></div><div class="wave"></div>
      <div>
        <input
          name="product"
          placeholder="Search your product..."
          className="searchInput"
          onChange={(e) => inputSearchHandler(e)}
        />
        <ShowProducts searchProducts={searchProducts} />
      </div>
    </div>
  );
};

export default Products;
