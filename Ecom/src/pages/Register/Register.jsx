import React, { useEffect, useState } from 'react'
import './register.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { publicRequest } from '../../requestMethod'
import { login } from '../../redux/apiCalls'

const Register = () => {
    const [data, setData] = useState({})
    const [err, setErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const dispatch = useDispatch()
    const isUserLogin = useSelector(state => state.user.currentUser)

    function handleChange(event) {
        setData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (data.password && data.password !== data.confirmPassword)
            return setErr("Password and Confirm Password doesn't match")

        try {
            await publicRequest.post(`auth/register`, data)
            login(dispatch, data)
            
        }
        catch (err) {
            setErr(err.response.data)
        }
    }

    useEffect(() => {
        const password = data?.password
        if (password) {
            if (password.length < 8) setPasswordErr("Password must be 8 digit long")
            else if (!password.match(/[A-Z]/)) setPasswordErr("Password must have a upper case A-Z")
            else if (!password.match(/[a-z]/)) setPasswordErr("Password must have a lower case a-z")
            else if (!password.match(/[0-9]/)) setPasswordErr("Password must have a number 0-9")
            else if (!password.match(/[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\;\:\'\"\|\\\,\<\.\>\/\?]/)) setPasswordErr("Password must have a special character eg. @$%^&*?")
            else if(password !== data.confirmPassword) setPasswordErr("Password and confirm-password not match")
            else setPasswordErr("")
        }

    }, [data.password, data.confirmPassword])

    if (isUserLogin) return <Navigate to='/' />

    return (
        <div className='register'>
            <div className="title">create new account</div>
            {err && <div className='register__error'>{err}</div>}
            <form action="" className='register__form'>
                <input type="text" placeholder='First Name' name='firstName' onChange={handleChange} />
                <input type="text" placeholder='Last Name' name='lastName' onChange={handleChange} />
                <input type="email" placeholder='Email Id' name='email' onChange={handleChange} />
                <input type="password" placeholder='Password' name='password' autoComplete='new-password' onChange={handleChange} />
                <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} />
                {passwordErr && <div>{passwordErr}</div>}
                <button className='btn' disabled={passwordErr} onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Register