import React, { useEffect, useState } from 'react'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'
import './slider.scss'

const img1 = "https://cdn.pixabay.com/photo/2016/03/27/18/52/flower-1283602_960_720.jpg"
const img2 = "https://cdn.pixabay.com/photo/2015/08/24/12/53/banner-904884_960_720.jpg"
const img3 = 'https://www.shutterstock.com/image-vector/ecommerce-website-banner-template-presents-260nw-2252124451.jpg'
const IMAGE = [img3, img1, img2]

const Slider = () => {
  const [imgIndex, setImgIndex] = useState(0)

  function handleClick(action) {
    if (action === 'left')
      setImgIndex(index => {
        if(index === 0) return IMAGE.length - 1
        return index - 1
    })
    if (action === 'right') setImgIndex(index => {
      if(index === IMAGE.length - 1) return 0
      return index + 1
    })
  }

  useEffect(() => {
    const timeOut = setInterval(() => handleClick('right'), 2000)

    return () => clearInterval(timeOut)
  }, [])

  return (
    <div className='slidebox'>
      <div className="slidebox__imgbox">
        {IMAGE.map(url => <img src={url} key={url} alt="" className='slidebox__img' style={{ translate: `${-100 * imgIndex}%`}} />)}
      </div>
      <div className="slidebox__rightarrow" onClick={() => handleClick('right')}>
        <BsFillArrowRightSquareFill className='slidebox__arrow' />
      </div>
      <div className="slidebox__leftarrow" onClick={() => handleClick('left')}>
        <BsFillArrowLeftSquareFill className='slidebox__arrow' />
      </div>
    </div>
  )
}

export default Slider
