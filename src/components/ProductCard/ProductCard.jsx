import React, { useContext } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from "react-router-dom";
import { useProductChangeContext } from "../../providers/ProductProvider";
import Rating from "../Rating/Rating";

export default function ProductCard({ product }) {
  const {user, admin} = useContext(AuthContext);
  const productSelect = useProductChangeContext();

  let navigate = useNavigate();

  const goDetail = () => {
    setTimeout(() => {
      productSelect(product);
      navigate("/productdetail");
    }, 200);
  };

  return (
  <div className="productCardDesign">
    <img src={product.url} alt={product.name} onClick={()=> goDetail()} ></img>
    {product.name}
    {product.rating}
    <Rating user={user} product={product}/>
  </div>
  );
}
