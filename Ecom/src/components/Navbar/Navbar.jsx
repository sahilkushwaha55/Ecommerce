import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import './navbar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/apiCalls';
import { SearchContext } from '../../context/SearchContext';

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {setSearchValue} = useContext(SearchContext)
  const user = useSelector(state => state.user.currentUser)

  function handleClick(){
    if(user){
      logout(dispatch)
      navigate('/')
    }
    else
      navigate('register')
  }

  function handleInput(event){
    setSearchValue(event.target.value)
  }

  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <NavLink to='/' className='navbar__link'>
          <h1 className='navbar__title'>SuperMart</h1>
        </NavLink>
        <NavLink to='men' className='navbar__link'>MENS</NavLink>
        <NavLink to='women' className='navbar__link'>WOMEN</NavLink>
        <NavLink to='kid' className='navbar__link'>KIDS</NavLink>
      </div>
      <div className='navbar__right'>
        <input type="text" className='navbar__searchbar' onFocus={() => navigate('/search')} onChange={handleInput} />
        <NavLink className='' to='cart'>
          <TiShoppingCart size={30} className='icon' />
        </NavLink>
        {
          user ?
            <CgProfile size={25} className='icon' onClick={() => navigate(`/user/${user._id}`)} /> :
            <button className='btn' onClick={() => navigate('/login')}>LogIn</button>
        }
        <button className='btn' onClick={handleClick}>{user ? "Log Out" : "SignUp"}</button>
      </div>
    </nav>
  )
}

export default Navbar