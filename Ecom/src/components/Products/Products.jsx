import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import axios from 'axios'
import './products.scss'
import { publicRequest } from '../../requestMethod'
import { SearchContext } from '../../context/SearchContext'
import { useSelector } from 'react-redux'

// const data = [
//     {
//         img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1410&q=80'
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//         img: 'https://plus.unsplash.com/premium_photo-1675186049409-f9f8f60ebb5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
//     }
// ]

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
          console.log(err)
        }
      }
      getProduct()

      return () => cancelToken.cancel()
    }, [ cat, filter?.size, filter?.color, filter?.sort, searchValue ])

  return (
    <div className='products'>
        {data.map((item, index) => <Product key={item._id} img={item.img} productId={item._id} price={item.price} />)}
    </div>
  )
}

export default Products