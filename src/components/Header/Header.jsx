import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
  let adminToken = true;
  let navigate = useNavigate();
  return (
    <div className='headerDesign'>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/")},250)}>Home</div>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/profile")},250)}>Profile</div>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/products")},250)}>Products</div>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/login")},250)}>Login</div>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/register")},250)}>Register</div>
    {adminToken === true ? <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/admin")},250)}>Admin</div> : null}
    
    
 </div>
  )
}

export default Header