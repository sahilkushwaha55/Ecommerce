import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './admin.scss'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import { publicRequest, userRequest } from '../../requestMethod';
import { useSelector } from 'react-redux';

const Admin = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const user = useSelector(state => state.user.currentUser)
  const cancelToken = axios.CancelToken.source()

  if(!user.isAdmin) navigate('/')

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`product`,
        {
          cancelToken: axios.CancelToken.source().token
        })
        setData(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getProduct()

    return () => cancelToken.cancel()
  }, [])

  async function handleDelete(id) {
    try {
      await userRequest.delete(`product/${id}`)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='admin'>
      <div className="admin__buttonContainer">
        <div className="admin__heading">All Products</div>
        <button className='btn' onClick={() => navigate('/admin/addproduct')}>Add New Product</button>
      </div>
      <div className="admin__product">
        <input type="checkbox" name="" id="" />
        <span className='admin__title'>Title</span>
        <span className='admin__title'>Image</span>
        <span className='admin__title'>Price</span>
        <span className='admin__title'>Edit</span>
        <span className='admin__title'>Delete</span>
      </div>
      {data.map((product) => <div className="admin__product" key={product._id}>
        <input type="checkbox" name="" id="" />
        <span className='admin__title'>{product.title}</span>
        <img src={product.img} alt={product.title} className='admin__img' />
        <span>{product.price}</span>
        <button className='btn' onClick={() => navigate(`/admin/${product._id}`)}>Edit</button>
        <RiDeleteBin6Line className='admin__icon' onClick={() => handleDelete(product._id)} />
      </div>)}
    </div>
  )
}

export default Admin