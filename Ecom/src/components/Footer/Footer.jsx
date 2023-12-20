import React from 'react'
import { Link } from 'react-router-dom'
import { IoLocationSharp, IoCallSharp, IoMail } from "react-icons/io5";
import './footer.scss'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__section'>
                <h1>SuperMart</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, adipisci! Architecto, ex? Unde repellendus porro facilis at totam nostrum vero architecto. Veritatis, officiis quidem. Dolorem dicta ad nisi a necessitatibus!</p>
            </div>

            <div className="footer__section">
                <div className="footer__heading">Useful Links</div>
                <ul className='footer__links'>
                    <li><Link to='../'>Home</Link></li>
                    <li><Link to='../cart'>Cart</Link></li>
                    <li><Link to='../whitelist'>Likes</Link></li>
                    <li><Link to='../men'>Men Fashion</Link></li>
                    <li><Link to='../women'>Women Fashion</Link></li>
                    <li><Link to='../kid'>Kids Fashion</Link></li>
                    <li>Career</li>
                    <li>Terms</li>
                </ul>
            </div>

            <div className="footer__section">
                <div className="footer__heading">contact</div>
                <div className='footer__contact'>
                    <IoLocationSharp /> 
                    <p>Varanasi, Uttar Pradesh - 221001</p>
                </div>

                <div className='footer__contact'>
                    <IoCallSharp /> 
                    <p>8318491159, 8545903570</p>
                </div>

                <div className='footer__contact'>
                    <IoMail /> 
                    <p>sahilkushwaha55@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer