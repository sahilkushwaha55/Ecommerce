import React, { useState } from 'react'
import uploadFile from '../../../firebase'
import { userRequest } from '../../../requestMethod';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import '../../Register/register.scss'


const AddProduct = () => {
    const [data, setData] = useState({})
    const [isUploading, setIsUploading] = useState(false)
    const [progress, SetProgress] = useState("")
    const user = useSelector(state => state.user.currentUser)

    if(!user.isAdmin) return <Navigate to='/' />

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
            setIsUploading(false)
            SetProgress('Image Uploaded')
        })
        .catch(() => {
            setIsUploading(true)
            SetProgress('Failed')
        })




        // const fileName = new Date().getTime() + file.name

        // const storage = getStorage(app)
        // const storageRef = ref(storage, fileName)
        // const uploadTask = uploadBytesResumable(storageRef, file);

        // // Register three observers:
        // // 1. 'state_changed' observer, called any time the state changes
        // // 2. Error observer, called on failure
        // // 3. Completion observer, called on successful completion
        // uploadTask.on('state_changed',
        //     (snapshot) => {
        //         // Observe state change events such as progress, pause, and resume
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         // console.log('Upload is ' + progress + '% done');
        //         SetProgress(progress.toFixed(2) + '%')
        //         switch (snapshot.state) {
        //             case 'paused':
        //                 // console.log('Upload is paused');
        //                 setIsUploading(false)
        //                 break;
        //             case 'running':
        //                 // console.log('Upload is running');
        //                 setIsUploading(true)
        //                 break;
        //         }
        //     },
        //     (error) => {
        //         // Handle unsuccessful uploads
        //         setIsUploading(false)
        //         SetProgress("Failed")
        //     },
        //     () => {
        //         // Handle successful uploads on complete
        //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //         setIsUploading(false)
        //         SetProgress("Image uploaded")
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             setData(prevState => {
        //                 return {
        //                     ...prevState,
        //                     img: downloadURL
        //                 }
        //             })
        //         });
        //     }
        // )
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
            const res = await userRequest.post('product', data)
            const form = document.querySelector('.register__form')
            form.reset()
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='register'>
            <div className="title">Add Product</div>
            <form action="" className='register__form'>
                <input type="text" placeholder="Product's title" name='title' onChange={onChangeHandler} />
                <input type="text" placeholder='Category: ex - shirt, jeans, silk' name='categories' onChange={handleArray} />
                <input type="text" placeholder='Size: xs, s, m, l, xl' name='size' onChange={handleArray} />
                <input type="number" placeholder='Price' name='price' onChange={onChangeHandler} />
                <input type="text" placeholder='Color: black, green, red etc.' name='color' onChange={handleArray} />
                <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>Product's image:</span>
                    <input type="file" name='img' onChange={handleFile} />
                    {progress && <span>{progress}</span>}
                </div>
                <textarea placeholder="Product's description" cols="30" rows="2" name='desc' onChange={onChangeHandler}></textarea>
                <button className='btn' onClick={handleSubmit} disabled={isUploading}>Save</button>
            </form>
        </div>
    )
}

export default AddProduct