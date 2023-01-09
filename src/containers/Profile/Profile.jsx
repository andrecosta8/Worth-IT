import React, { useContext, useEffect } from 'react'
import './Profile.css'
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(()=> {
    if(user === null) {navigate("/login")}
  }, []);
  return (
    <div className='profileDesign'>
      <div>USER INFO:
      <div>{user.name}</div>
      <div>{user.email}</div> 
      </div> 
    </div>
  )
}

export default Profile