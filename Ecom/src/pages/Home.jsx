import React from 'react'
import Slider from '../components/Slider/Slider'
import Categorius from '../components/Categorius/Categorius'
import Products from '../components/Products/Products'
// import { getToken } from '../requestMethod'

const Home = () => {

  // getToken()

  return (
    <>
      <Slider />
      <Categorius />
      <Products />
    </>
  )
}

export default Home