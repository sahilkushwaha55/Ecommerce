import React, { useEffect, useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";
import './product.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userRequest } from '../../requestMethod';
import { addList, removeList } from '../../redux/whiteListRedux';
import { AiOutlineHeart } from 'react-icons/ai';
import useHttp from '../../hooks/useHttp';

const Product = () => {
    const { id } = useParams()
    const [quantity, setquantity] = useState(1)
    const dispatch = useDispatch()
    const whiteList = useSelector(state => state.whiteList.list)
    const userId = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?._id
    const httpReq = useHttp({url: `product/find/${id}`})

    const likeProduct = whiteList.some(list => list.id === id) ? 'fill-red' : ""

    function handleQuantity(action) {
        if (quantity > 1 && action === 'dec')
            setquantity(oldValue => oldValue - 1)
        if (action === 'inc') setquantity(oldValue => oldValue + 1)
    }

    function handleToggleLike(){
        if(likeProduct) dispatch(removeList(id))
        else dispatch(addList({id, img: httpReq.data.img, price: httpReq.data.price}))
    }

    async function handleClick() {
        try {
            // getToken()
            await userRequest.put(`cart/${userId}`, {id, quantity, price: httpReq.data.price})
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='product'>
            <div className="product__img" style={{ backgroundImage: `url(${httpReq.data.img})` }}>
                <AiOutlineHeart className={`product__icon ${likeProduct}` }onClick={handleToggleLike} />
            </div>
            <div className="product__detail">
                <div className="product__title">
                    {httpReq.data.title}
                </div>
                <p>{httpReq.data.desc}</p>
                <div className="product__price">₹ {httpReq.data.price}</div>

                <div>
                    <label>Size</label>
                    <select name="Size" id="size" defaultValue={'size'}>
                        <option disabled value='size'> Size</option>
                        {httpReq.data.size && httpReq.data.size.map((size, index) => <option value={size} key={index}>{size}</option>)}
                    </select>
                </div>
                <div className='product__add'>
                    <div>
                        <FaMinus onClick={() => handleQuantity('dec')} />
                        <span className='product__cartAmount'>{quantity}</span>
                        <FaPlus onClick={() => handleQuantity('inc')} />
                    </div>
                    <button className='btn' onClick={handleClick}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product