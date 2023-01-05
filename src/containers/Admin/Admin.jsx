import React, { useEffect, useState } from 'react'
import { getAllComments, getAllUsers, getProducts } from '../../services/apiCalls';
import './Admin.css'

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);

useEffect(()=>{
  (async () => {
    let productsResult = await getProducts()
    setProducts(productsResult.data)
    let commentsResult = await getAllComments()
    setComments(commentsResult.data)
    let usersResult = await getAllUsers()
    setUsers(usersResult.data)
  })()
},[])

  return (
    <div className='adminHomeDesign'>Admin
    {users.map((user) => {
      return (
        <div>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.isAdmin}</div>
        <br></br>
        </div>
      )
    })}
    </div>
  )
}

export default Admin