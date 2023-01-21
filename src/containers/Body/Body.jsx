import './Body.css'
import Admin from "../Admin/Admin";
import CommentsManagement from '../CommentsManagement/CommentsManagement';
import Detail from "../Detail/Detail";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Products from "../Products/Products";
import ProductsManagement from '../ProductsManagement/ProductsManagement';
import Profile from "../Profile/Profile";
import React from 'react'
import Register from "../Register/Register";
import UsersManagement from '../UsersManagement/UsersManagement';
import { Route, Routes } from "react-router-dom";
import NotFound from '../NotFound/NotFound';

const Body = () => {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} /> 
      <Route path="/admin/comments" element={<CommentsManagement />}/>
      <Route path="/admin/products" element={<ProductsManagement />}/>
      <Route path="/admin/users"  element={<UsersManagement/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/productdetail" element={<Detail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  )
}

export default Body