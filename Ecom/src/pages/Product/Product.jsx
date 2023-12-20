import React, { useEffect, useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";
import './product.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { publicRequest, userRequest } from '../../requestMethod';
import axios from 'axios';
import { addList, removeList } from '../../redux/whiteListRedux';
import { AiOutlineHeart } from 'react-icons/ai';

const Product = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [quantity, setquantity] = useState(1)
    const dispatch = useDispatch()
    const whiteList = useSelector(state => state.whiteList.list)
    const cancelToken = axios.CancelToken.source()
    const userId = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?._id

    const likeProduct = whiteList.some(list => list.id === id) ? 'fill-red' : ""

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`product/find/${id}`,
                    {
                        cancelToken: cancelToken.token
                    })
                setData(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getProduct()

        return () => cancelToken.cancel()
    }, [])

    function handleQuantity(action) {
        if (quantity > 1 && action === 'dec')
            setquantity(oldValue => oldValue - 1)
        if (action === 'inc') setquantity(oldValue => oldValue + 1)
    }

    function handleToggleLike(){
        if(likeProduct) dispatch(removeList(id))
        else dispatch(addList({id, img: data.img, price: data.price}))
    }

    async function handleClick() {
        try {
            await userRequest.put(`cart/${userId}`, {id, quantity, price: data.price})
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='product'>
            <div className="product__img" style={{ backgroundImage: `url(${data.img})` }}>
                <AiOutlineHeart className={`products__icon ${likeProduct}` }onClick={handleToggleLike} />
            </div>
            <div className="product__detail">
                <div className="product__title">
                    {data.title}
                </div>
                <p>{data.desc}</p>
                <div className="product__price">₹ {data.price}</div>

                <div>
                    <label>Size</label>
                    <select name="Size" id="size" defaultValue={'size'}>
                        <option disabled value='size'> Size</option>
                        {data.size && data.size.map((size, index) => <option value={size} key={index}>{size}</option>)}
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