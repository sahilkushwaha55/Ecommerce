import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/apiCalls'
import { Navigate } from 'react-router-dom'

import '../Register/register.scss'

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" })
  const dispatch = useDispatch()
  const { isFetching, error} = useSelector((state) => state.user)
  const isUserLogin = useSelector(state => state.user.currentUser)

  function handleChange(event) {
    setUser(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    login(dispatch, user)
  }

  if(isUserLogin) return <Navigate to='/' />

  return (
    <div className='register'>
      <div className="title">Login to your account</div>
      {error && <div className='register__error'>{error}</div>}
      <form action="" className='register__form'>
        <input type="email" placeholder='Email Id' name='email' onChange={handleChange} />
        <input type="password" placeholder='Password' name='password' onChange={handleChange} />
        <button className='btn' onClick={handleSubmit} disabled={isFetching}>Log In</button>
      </form>
    </div>
  )
}

export default Login