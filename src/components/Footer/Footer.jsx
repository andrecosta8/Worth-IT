import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const navigate= useNavigate();
  return (
    <div className='footerDesign'>
      <div className='madeby'> made by: André Costa</div>
    </div>
  )
}

export default Footer