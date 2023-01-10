import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import SearchProducts from "../../components/SearchProducts/SearchProducts";

const Products = () => {
  const [searchProducts, setSearchProducts] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

 
  const inputSearchHandler = (e) => {
    let timeOutId;
    if(timeOutId){clearTimeout(timeOutId)}
     timeOutId =  setTimeout(() => {setSearchProducts(e.target.value)},500)
  }
  
  return (
    <div className="productsPageDesign">
      <div>
        <input
          name="product"
          placeholder="Search your product..."
          className="searchInput"
          onChange={(e) => inputSearchHandler(e)}
        />
        <SearchProducts searchProducts ={searchProducts} />
      </div>
    </div>
  );
};

export default Products;
