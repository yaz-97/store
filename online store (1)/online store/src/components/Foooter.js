import React from 'react'
import "../assets/css/footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
const Foooter = () => {
  return (
    <div className='footer'>
        <p>&copy; 2024 All Rights Reserved. Online Store</p>
        <div className='socialIcons'>
            <FaFacebook size={25}/>
            <FaTwitter size={25}/>
            <FaInstagram size={25}/>
            <IoLogoYoutube size={25}/>
        </div>
    </div>
  )
}

export default Foooter