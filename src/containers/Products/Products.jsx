import ShowProducts from "../../components/ShowProducts/ShowProducts";
import "./Products.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Products = () => {
  const [searchProducts, setSearchProducts] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user === null) navigate("/");
  });

  const inputSearchHandler = (e) => {
    setLoading(true);
    let timeOutId;
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      setLoading(false);
      setSearchProducts(e.target.value);
    }, 1000);
  };

  return (
    <div className="productsPageDesign">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="search-container">
        <input
          name="product"
          placeholder="Search your product..."
          className="search-input"
          onChange={(e) => inputSearchHandler(e)}
        />
        <SearchIcon color="primary" />
      </div>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="showProducts">
          <ShowProducts searchProducts={searchProducts} />
        </div>
      )}
    </div>
  );
};

export default Products;
