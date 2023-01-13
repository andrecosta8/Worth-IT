import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";
import { AuthContext } from "../../providers/AuthProvider";
import "./CreateProduct.css";

const CreateProduct = ({ productToEdit }) => {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin === null) navigate("/");
  });

  return <ProductForm productToEdit={productToEdit} />;
};

export default CreateProduct;
