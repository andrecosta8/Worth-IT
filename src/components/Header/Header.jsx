import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
  let navigate = useNavigate();
  
  const { admin, user } = useContext(AuthContext)
  const { removeUserFromContext } = useContext(AuthContext);
  const { removeAdminFromContext } = useContext(AuthContext);

  const logOut = () => {
    removeUserFromContext();
    removeAdminFromContext();
    navigate("/")
  }
  return (
    <div className='headerDesign'>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/")},250)}>Home</div>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/profile")},250)}>Profile</div>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/products")},250)}>Products</div>
    <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/register")},250)}>Register</div>
    {admin !== null ? <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/admin")},250)}>Admin</div> : null}
    {user !== null ? <div className="linkDesign" onClick={()=>setTimeout(()=>{logOut()},250)}>Logout</div> : <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/login")},250)}>Login</div> }
 </div>
  )
}

export default Header