import React, { useEffect, useState } from 'react'
import '../Register/register.scss'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { userRequest } from '../../requestMethod'
import useHttp from '../../hooks/useHttp'

const EditProfile = () => {
    const { id } = useParams()
    const httpReq = useHttp({url: `user/find/${id}`})
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const isUserLogin = useSelector(state => state.user.currentUser)

    function handleChange(event){
        httpReq.setData(prevState => {
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }

    async function handleSubmit(event){
        event.preventDefault()

        if(httpReq.data.password && httpReq.data.password !== httpReq.data.confirmPassword) 
        return setErr("Password and Confirm Password doesn't match")

        try{
            await userRequest.put(`user/${id}`, httpReq.data)
        }
        catch(err)
        {
            console.log(err)
        }
        navigate('/')
    }

    if (!isUserLogin) return <Navigate to='/' />

    return (
        <div className='register'>
            <div className="title">Update your profile</div>
            {err && <div>{err}</div>}
            <form action="" className='register__form'>
                <input type="text" placeholder='First Name' name='firstName' value={httpReq.data.firstName || ""} onChange={handleChange}/>
                <input type="text" placeholder='Last Name' name='lastName' value={httpReq.data.lastName || ""} onChange={handleChange}/>
                <input type="email" placeholder='Email Id' name='email' value={httpReq.data.email || ""} onChange={handleChange}/>
                <input type="password" placeholder='New Password' autoComplete='new-password' name='password'onChange={handleChange}/>
                <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange}/>
                <button className='btn' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default EditProfile