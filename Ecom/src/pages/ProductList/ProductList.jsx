import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './productList.scss'
import Products from '../../components/Products/Products'

const ProductList = () => {
  const { category } = useParams()
  const [filter, setFilter] = useState({})
  const [showClear , setShowClear] = useState(false)

  function handleFilter(event){
    setShowClear(true)
    setFilter(prevState => {
      return {
        ...prevState,
        [event.target.name] : event.target.value
      }
    })
  }

  function handleClearFilter(){
    setFilter({})
    setShowClear(false)
  }

  return (
    <div className='productList'>
      <div className="title">{category}</div>
      <div className="productList__selection">
        <div className="productList__filter">
          <label>Products Filters</label>
          <select name="color" id="colors" onChange={handleFilter} value={filter?.color ? filter.value : 'color'}>
            <option disabled value='color'> Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
          </select>

          <select name="size" id="size" onChange={handleFilter} value={filter?.size ? filter.size : 'size'}>
            <option disabled value='size'> Size</option>
            <option value="xs">Extra Small</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
            <option value="xl">Extra Large</option>
          </select>
          {showClear && <span className='productList__clearFilter' onClick={handleClearFilter}>Clear filter & sort</span>}
        </div>
        <div className="productList__sort">
          <label>Sort Products</label>
          <select name="sort" id="sort" onChange={handleFilter} value={filter?.sort ? filter.sort : 'sort'}>
          <option disabled value='sort'> Sort</option>
            <option value="1">Low to high</option>
            <option value="-1">High to low</option>
          </select>
        </div>
      </div>

      <Products cat={category} filter={filter} />
    </div>
  )
}

export default ProductList