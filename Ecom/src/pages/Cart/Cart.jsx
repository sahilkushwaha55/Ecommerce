import React from 'react'
import './cart.scss'
import { Link } from 'react-router-dom'
import CartItem from '../../components/CartItem/CartItem'
import useHttp from '../../hooks/useHttp'

const Cart = () => {
  const userId = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?._id
  const httpReq = useHttp({method: 'get', url: `cart/find/${userId}`})
  
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
        {httpReq.data?.products && 
        <div className="cart__box">
          <div className="cart__item">
            {
              httpReq.data.products.map((item) => <CartItem key={item._id} product={item} userId={userId} setCart={httpReq.setData} />)
            }
          </div>
          <div className="cart__summary">
            <div className="cart__summaryTitle">ORDER SUMMARY</div>
            <div className="cart__inline">
              <span>Subtotal</span>
              <span>₹{httpReq.data.totalPrice}</span>
            </div>

            <div className="cart__inline">
              <span>Estimated Shopping</span>
              <span>₹{httpReq.data.totalPrice}</span>
            </div>

            <div className="cart__inline">
              <span>Shopping Discount</span>
              <span>₹-{httpReq.data.totalPrice * 1 / 10}</span>
            </div>

            <div className="cart__inline cart__totalAmount">
              <span>Total</span>
              <span>₹{Math.round(httpReq.data.totalPrice - (httpReq.data.totalPrice * 1 / 10))}</span>
            </div>

            <button className='btn cart__button'>Checkout Now</button>
          </div>
        </div>}
    </div>
  )
}

export default Cart