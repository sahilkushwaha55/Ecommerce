import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import uploadFile from '../../../firebase'
import { userRequest } from '../../../requestMethod';
import { useSelector } from 'react-redux';

import '../../Register/register.scss'
import useHttp from '../../../hooks/useHttp';

const EditProduct = () => {
    const { id } = useParams()
    const httpReq = useHttp({url: `product/find/${id}`})
    const navigate = useNavigate()
    const [isUploading, setIsUploading] = useState(false)
    const [progress, SetProgress] = useState("")
    const user = useSelector(state => state.user.currentUser)

    if(!user.isAdmin) navigate('/')

    function onChangeHandler(event) {
        httpReq.setData(prevState => {
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
            httpReq.setData(prevState => {
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
        httpReq.setData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value.split(/\s*,\s*/)
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await userRequest.put(`product/${id}`, httpReq.data)
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
                <input type="text" placeholder="Product's title" name='title' onChange={onChangeHandler} value={httpReq.data.title || ""} />
                <input type="text" placeholder='Category: ex - shirt, jeans, silk' name='categories' onChange={handleArray} value={httpReq.data.categories || ""} />
                <input type="text" placeholder='Size: xs, s, m, l, xl' name='size' onChange={handleArray} value={httpReq.data.size || ""} />
                <input type="number" placeholder='Price' name='price' onChange={onChangeHandler} value={httpReq.data.price || 0} />
                <input type="text" placeholder='Color: black, green, red etc.' name='color' onChange={handleArray} value={httpReq.data.color || ""} />
                <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>Product's image:</span>
                    <input type="file" name='img' onChange={handleFile} />
                    {progress && <span>{progress}</span>}
                </div>
                <textarea placeholder="Product's description" cols="30" rows="2" name='desc' onChange={onChangeHandler} value={httpReq.data.desc || ""}></textarea>
                <button className='btn' onClick={handleSubmit} disabled={isUploading}>Save</button>
            </form>
        </div>
    )
}

export default EditProduct