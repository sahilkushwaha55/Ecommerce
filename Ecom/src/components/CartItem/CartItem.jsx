import React, { useState } from 'react'
import './cartItem.scss'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { userRequest } from '../../requestMethod'
import useHttp from '../../hooks/useHttp'

const CartItem = ({product, userId, setCart}) => {
  const httpReq = useHttp({ method: 'get', url: `product/find/${product.productId}`})
  const [ quantity , setQuantity] = useState(product.quantity)

  async function handleClick(value) {
    try{
      if(value === 'inc'){
            const res = await userRequest.put(`cart/${userId}`, {id: product.productId, quantity: 1, price: data.price})
            setQuantity(prevState => prevState + 1)
            setCart(prev => {
              return {
                ...prev,
                totalPrice: prev.totalPrice + httpReq.data.price
              }
            })
      }
      if(value === 'dec' && quantity > 0){
        const res = await userRequest.put(`cart/${userId}`, {id: product.productId, quantity: 1, price: httpReq.data.price, remove: 1 })
        setQuantity(prevState => prevState - 1)
        setCart(prev => {
          return {
            ...prev,
            totalPrice: prev.totalPrice - httpReq.data.price
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
        <img src={httpReq.data.img} alt={httpReq.data.title} className='cartItem__img' />
        
        <div className="cartItem__detail">
          <div><span>Product:</span> {httpReq.data.title}</div>
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
            <div className="product__price">₹ {httpReq.data.price * quantity}</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartItem