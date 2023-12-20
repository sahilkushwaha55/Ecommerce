import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { userRequest } from '../../requestMethod';
import { addList, removeList } from '../../redux/whiteListRedux';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ img, productId, price }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const whiteList = useSelector(state => state.whiteList.list)
    const userId = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?._id

    const likeProduct = whiteList.some(list => list.id === productId) ? 'fill-red' : ""

    async function handleClick() {
        try {
            await userRequest.put(`cart/${userId}`, {id: productId, quantity: 1, price})
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleToggleLike(){
        if(likeProduct) dispatch(removeList(productId))
        else dispatch(addList({id: productId, img, price}))
    }

    return (
        <div className='products__card' style={{ backgroundImage: `url(${img})` }}>
            <Link to={`../product/${productId}`} className="products__blurBox">
            </Link>
            <div className="products__iconBox">
                <TiShoppingCart className='products__icon' onClick={handleClick}/>
                <AiOutlineSearch className='products__icon' onClick={() => navigate(`../product/${productId}`)} />
                <AiOutlineHeart className={`products__icon ${likeProduct}` }onClick={handleToggleLike} />
            </div>
        </div>
    )
}

export default Product