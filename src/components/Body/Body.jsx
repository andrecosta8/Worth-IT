import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "../../containers/Home/Home";

const Body = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </>
  )
}

export default Body