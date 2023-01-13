import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { AuthContext } from "../../providers/AuthProvider";

const Admin = () => {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin === null) navigate("/");
  });

  return (
    <div className="adminHomeDesign">
      <div
        className="linkDesign"
        onClick={() =>
          setTimeout(() => {
            navigate("/admin/products");
          }, 250)
        }
      >
        Products
      </div>
      <div
        className="linkDesign"
        onClick={() =>
          setTimeout(() => {
            navigate("/admin/comments");
          }, 250)
        }
      >
        Comments
      </div>
      <div
        className="linkDesign"
        onClick={() =>
          setTimeout(() => {
            navigate("/admin/users");
          }, 250)
        }
      >
        Users
      </div>
    </div>
  );
};

export default Admin;
