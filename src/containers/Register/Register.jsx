import React, { useState } from "react";
import "./Register.css";
import { registerNewUser } from "../../services/apiCalls";
import { validateForm } from "../../services/validate";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: "false",
  });
  const [error, setError] = useState("");

  const handleData = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const register = (user) => {
    let validationError = validateForm(user);
    setError(validationError);
    if (error === "no error") registerNewUser(user);
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
