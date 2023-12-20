import React from 'react'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'
import './slider.scss'

const Slider = () => {
  return (
    <div className='slidebox'>
      <div className="slidebox__imgbox">
        <img src="https://cdn.pixabay.com/photo/2016/03/27/18/52/flower-1283602_960_720.jpg" 
        alt="" className='slidebox__img' />
      </div>
      <div className="slidebox__imgbox">
        <img src="https://cdn.pixabay.com/photo/2015/08/24/12/53/banner-904884_960_720.jpg" 
        alt="" className='slidebox__img' />
      </div>
      <div className="slidebox__rightarrow">
        <BsFillArrowRightSquareFill className='slidebox__arrow' />
      </div>
      <div className="slidebox__leftarrow">
        <BsFillArrowLeftSquareFill className='slidebox__arrow' />
      </div>
    </div>
  )
}

export default Slider
