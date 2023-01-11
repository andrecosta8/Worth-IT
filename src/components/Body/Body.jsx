import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "../../containers/Home/Home";
import Register from "../../containers/Register/Register";
import Login from "../../containers/Login/Login";
import Profile from "../../containers/Profile/Profile";
import Products from "../../containers/Products/Products";
import Detail from "../../containers/Detail/Detail";
import Admin from "../../containers/Admin/Admin";
import CreateProduct from '../../containers/CreateProduct/CreateProduct';

const Body = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<Products/>} />
      <Route path="/productdetail" element={<Detail />} />
      <Route path="/admin" element={<Admin />} /> 
      <Route path="/admin/createproduct" element={<CreateProduct/>} />
    </Routes>
  </>
  )
}

export default Body