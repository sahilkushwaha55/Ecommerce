import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({img, category, offer}) => {
  return (
    <Link to={category} className='categorius__item' style={{backgroundImage: `url(${img})`}}>
        <div className="categorius__title">{category}</div>
        <div className="categorius__offer">{offer}</div>
        <button className='btn--animated'>Shop Now</button>
    </Link>
  )
}

export default CategoryItem