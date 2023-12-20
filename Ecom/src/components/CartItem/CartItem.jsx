import React, { useEffect, useState } from 'react'
import './cartItem.scss'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import axios from 'axios'
import { publicRequest, userRequest } from '../../requestMethod'

const CartItem = ({product, userId, setCart}) => {
  const [data, setData] = useState({})
  const [ quantity , setQuantity] = useState(product.quantity)
  const cancelToken = axios.CancelToken.source()

  useEffect(() => {
    const getProduct = async () => {
      try {
          const res = await publicRequest.get(`product/find/${product.productId}`,
              {
                  cancelToken: cancelToken.token
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

  async function handleClick(value) {
    try{
      if(value === 'inc'){
            const res = await userRequest.put(`cart/${userId}`, {id: product.productId, quantity: 1, price: data.price})
            setQuantity(prevState => prevState + 1)
            setCart(prev => {
              return {
                ...prev,
                totalPrice: prev.totalPrice + data.price
              }
            })
      }
      if(value === 'dec' && quantity > 0){
        const res = await userRequest.put(`cart/${userId}`, {id: product.productId, quantity: 1, price: data.price, remove: 1 })
        setQuantity(prevState => prevState - 1)
        setCart(prev => {
          return {
            ...prev,
            totalPrice: prev.totalPrice - data.price
          }
        })
      }
    }
    catch(err){
      console.log(err)
    }
}

  return (
    <div>
      <div className="cartItem">
        <img src={data.img} alt={data.title} className='cartItem__img' />
        
        <div className="cartItem__detail">
          <div><span>Product:</span> {data.title}</div>
          <div className='cart__inline'>
            <div><span>Id:</span> {product.productId}</div>
            <div>
              <FaMinus onClick={() => handleClick('dec')} />
              <span className='product__cartAmount'> {quantity} </span>
              <FaPlus onClick={() => handleClick('inc')} />
            </div>
          </div>

          <div className='cart__inline'>
            <div><span>Size:</span> Small</div>
            <div className="product__price">₹ {data.price * quantity}</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartItem