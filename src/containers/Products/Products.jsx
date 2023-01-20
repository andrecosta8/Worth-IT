import  ShowProducts  from "../../components/ShowProducts/ShowProducts";
import "./Products.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [searchProducts, setSearchProducts] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) navigate("/");
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
