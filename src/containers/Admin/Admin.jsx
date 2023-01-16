import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { AuthContext } from "../../providers/AuthProvider";
import { PasswordForm } from "../../components/PasswordForm/PasswordForm";

const Admin = () => {
  const { admin, user } = useContext(AuthContext);
  const [passForm, setPassForm] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (admin === null) navigate("/");
  });
  const togglePassForm = () => {
    setPassForm(!passForm)
  }

  return (
    <div className="adminHomeDesign">
      <button onClick={() => togglePassForm()}>Change PASSWORD</button>
        {passForm === true ? <PasswordForm user={user} togglePassForm={togglePassForm}/>: null }
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
