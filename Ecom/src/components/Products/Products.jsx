import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import axios from 'axios'
import './products.scss'
import { publicRequest } from '../../requestMethod'
import { SearchContext } from '../../context/SearchContext'

const Products = ({ cat, filter }) => {
  const [data, setData] = useState([])
  const {searchValue} = useContext(SearchContext)
  const cancelToken = axios.CancelToken.source()
  
    useEffect(() => {
      const getProduct = async () => {
        let url = 'product?qNew=true'
        if(cat) url += `&qCategory=${cat}`
        if(filter?.size) url += `&size=${filter.size}`
        if(filter?.color) url += `&color=${filter.color}`
        if(filter?.sort) url += `&sort=${filter.sort}`
        if(searchValue) url += `&name=${searchValue}`

        try{
          const res = await publicRequest.get(cat ? url : `product?new=true&name=${searchValue}`,
          {
            cancelToken: cancelToken.token
          })
            setData(res.data)
        }
        catch(err){
          console.log(err.message)
        }
      }
      getProduct()

      return () => cancelToken.cancel()
    }, [ cat, filter?.size, filter?.color, filter?.sort, searchValue ])

  return (
    <div className='products'>
        {data.map((item) => <Product key={item._id} img={item.img} productId={item._id} price={item.price} />)}
    </div>
  )
}

export default Products