import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import uploadFile from '../../../firebase'
import { publicRequest, userRequest } from '../../../requestMethod';
import { useSelector } from 'react-redux';

import '../../Register/register.scss'

const EditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [isUploading, setIsUploading] = useState(false)
    const [progress, SetProgress] = useState("")
    const user = useSelector(state => state.user.currentUser)
    const cancelToken = axios.CancelToken.source()

    if(!user.isAdmin) navigate('/')

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`product/find/${id}`,
                {
                  cancelToken: cancelToken.token
                })
                setData({
                    ...res.data
                })
            }
            catch (err) {
                console.log(err)
            }
        }
        getProduct()

        return () => cancelToken.cancel()
    }, [])

    function onChangeHandler(event) {
        setData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleFile(event) {
        setIsUploading(true)
        SetProgress("Uploading...")

        const file = event.target.files[0]

        uploadFile(file).then((imageURL) => {
            setData(prevState => {
                return {
                    ...prevState,
                    img: imageURL
                }
            })
            setIsUploading(imageURL ? false : true)
            SetProgress(imageURL ? 'Image Uploaded' : 'Failed')
        })
    }

    function handleArray(event) {
        setData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value.split(/\s*,\s*/)
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await userRequest.put(`product/${id}`, data)
            navigate("../admin")
        }
        catch (err) {
            console.log(err.message)
        }
    }


    return (
        <div className='register'>
            <div className="title">Add Product</div>
            <form action="" className='register__form'>
                <input type="text" placeholder="Product's title" name='title' onChange={onChangeHandler} value={data.title || ""} />
                <input type="text" placeholder='Category: ex - shirt, jeans, silk' name='categories' onChange={handleArray} value={data.categories || ""} />
                <input type="text" placeholder='Size: xs, s, m, l, xl' name='size' onChange={handleArray} value={data.size || ""} />
                <input type="number" placeholder='Price' name='price' onChange={onChangeHandler} value={data.price || 0} />
                <input type="text" placeholder='Color: black, green, red etc.' name='color' onChange={handleArray} value={data.color || ""} />
                <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>Product's image:</span>
                    <input type="file" name='img' onChange={handleFile} />
                    {progress && <span>{progress}</span>}
                </div>
                <textarea placeholder="Product's description" cols="30" rows="2" name='desc' onChange={onChangeHandler} value={data.desc || ""}></textarea>
                <button className='btn' onClick={handleSubmit} disabled={isUploading}>Save</button>
            </form>
        </div>
    )
}

export default EditProduct