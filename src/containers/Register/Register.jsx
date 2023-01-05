import React, { useState } from "react";
import "./Register.css";
import { registerNewUser } from "../../services/apiCalls";
import { validateForm } from "../../services/validate";
import { checkEmail } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: "false",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate("/profile")

  const handleData = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async (user) => {
    let validationError;
    if (await checkEmail(user.email) === false) {
    validationError = "E-mail is already in use"
    }else {
    validationError = validateForm(user);
    }
    setError(validationError);
    if (error === "no error") {
      registerNewUser(user);
      navigate("/profile")
    }
  };

  return (
    <div className="registerDesign">
      <input
        className="myInput"
        type="text"
        name="name"
        id="name"
        title="name"
        placeholder="Name:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />

      <input
        className="myInput"
        type="email"
        name="email"
        id="email"
        title="email"
        placeholder="E-mail:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <input
        className="myInput"
        type="password"
        name="password"
        id="password"
        title="password"
        placeholder="Password:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <div className="bottomSection">
        <div
          className="designRegisterButton"
          onClick={() => {
            register(user);
          }}
        >
          Register
        </div>
      </div>
      <div>{error === "no error" ? null : error}</div>
    </div>
  );
};

export default Register;
