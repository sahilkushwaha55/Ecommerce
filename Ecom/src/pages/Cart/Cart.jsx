import React, { useEffect, useState } from 'react'
import './cart.scss'
import { Link, useParams } from 'react-router-dom'
import CartItem from '../../components/CartItem/CartItem'
import { publicRequest } from '../../requestMethod'

const Cart = () => {
  const [ cart, setCart ] = useState({})
  const userId = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?._id

  useEffect(() => {
    const getCart = async () => {
      try {
          const res = await publicRequest.get(`cart/find/${userId}`)
          setCart(res.data)
      }
      catch (err) {
          console.log(err)
      }
  }
  if(userId) getCart()
  }, [])
  
  return (
    <div className='cart'>
        <div className="title">Your Cart</div>
        <div className="cart__buttonContainer">
            <button className="btn--animated" style={{color: '#000'}}>Continue Shopping</button>
            <div>
                <Link>Shopping Cart</Link>
                <Link to='../whitelist'>Your Likes</Link>
            </div>
            <button className='btn'>Checkout Now</button>
        </div>
        <div className="cart__box">
          <div className="cart__item">
            {
              cart?.products?.map((item) => <CartItem key={item._id} product={item} userId={userId} setCart={setCart} />)
            }
          </div>
          <div className="cart__summary">
            <div className="cart__summaryTitle">ORDER SUMMARY</div>
            <div className="cart__inline">
              <span>Subtotal</span>
              <span>₹{cart?.totalPrice}</span>
            </div>

            <div className="cart__inline">
              <span>Estimated Shopping</span>
              <span>₹{cart?.totalPrice}</span>
            </div>

            <div className="cart__inline">
              <span>Shopping Discount</span>
              <span>₹-{cart?.totalPrice * 1 / 10}</span>
            </div>

            <div className="cart__inline cart__totalAmount">
              <span>Total</span>
              <span>₹{Math.round(cart?.totalPrice - (cart?.totalPrice * 1 / 10))}</span>
            </div>

            <button className='btn cart__button'>Checkout Now</button>
          </div>
        </div>
    </div>
  )
}

export default Cart