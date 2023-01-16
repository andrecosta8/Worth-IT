import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/apiCalls";
import { validateForm } from "../../services/validate";

export const PasswordForm = ({user, togglePassForm}) => {
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleData = (e) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

const changePassword = () => {
    if(newPassword.newPassword === newPassword.repeatPassword){
     let validationError = validateForm({
        name: user.name,
        email: user.email,
        password: newPassword.newPassword,
    })
    if (validationError === null) {updateUser({
        password: newPassword.newPassword,
        id: user.id,
    })
    togglePassForm();
}
    setError(validationError)
}else{
    setError("Passwords needs to match");
}

}
  return (
    <div className="passwordFormDesign">
      <input
        className="myInput"
        type="password"
        name="newPassword"
        id="newPassword"
        title="newPassword"
        placeholder="New Password"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <input
        className="myInput"
        type="password"
        name="repeatPassword"
        id="repeatPassword"
        title="repeatPassword"
        placeholder="Repeat Password:"
        autoComplete="off"
        onChange={(e) => {
          handleData(e);
        }}
      />
      <div className="bottomSection">
        <button className="designLoginButton" onClick={() => changePassword()}>
          Update Password
        </button>
      </div>
      <div>{error === null ? null : error}</div>
    </div>
  );
};
