import React from 'react'
import Product from '../../components/Products/Product'
import { useSelector } from 'react-redux'

import './whiteList.scss'

const WhiteList = () => {
    const list = useSelector(state => state.whiteList.list)
  return (
    <div className='whiteList'>
        {list.map(item => <Product key={item.id} img={item.img} productId={item.id} price={item.price}/>)}
    </div>
  )
}

export default WhiteList