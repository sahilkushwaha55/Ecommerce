import React from 'react'
import './categorius.scss'
import CategoryItem from './CategoryItem'

const data = [
  {
    category: 'men',
    img: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    offer: 'BUT ONE GET ONE "LIMITED TIME"'
  },
  {
    category: 'women',
    img: 'https://images.unsplash.com/photo-1583391265517-35bbdad01209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    offer: 'FLAT 30% OFF ON ALL CLOTHES'
  },
  {
    category: 'kid',
    img: 'https://images.unsplash.com/photo-1597413545419-4013431dbfec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    offer: 'FREE SHOES ON PAIR OF CLOTH'
  },
]

const Categorius = () => {
  return (
    <div className='categorius'>
      {data.map((item, index) => <CategoryItem key={index} img={item.img} category={item.category} offer={item.offer} />)}
    </div>
  )
}

export default Categorius