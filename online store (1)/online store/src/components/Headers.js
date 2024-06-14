import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlBasket } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import "../assets/css/header.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";

const Headers = () => {
  
  const [MenuToggle,setManuToggle] = useState(false)
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartLegth, setCartLength] = useState(0)

  useEffect(() => {
    
    const loggedIn = sessionStorage.getItem('loggedin');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartLength = savedCartItems.length;
setCartLength(cartLength);

  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem( 'loggedin' );
    setIsLoggedIn(false);
  };

  

  return (
    <div className='header'>
      <h1>Store</h1>
      <div className='navlinks'>
        <div className='navlinks' id={MenuToggle? 'navResponse': 'navResponse1'}>
        <Link to="/" className='links'>Home</Link>
        <Link to="/products" className='links'>Products</Link>
        </div>
        {isLoggedIn ? (
          <> 
            <Link to="/cart" className='links'><SlBasket /> ({cartLegth})</Link>
            <div className='profileIcon'>
              <FaRegUserCircle className='links'/>
              <IoMdArrowDropdown className='links' onClick={handleToggle} />
              <div className={toggle ? "toggleActive" : "dropdown"}>
                <Link to="/profile" className='links'>Profile</Link>
                <Link to="/" className='links' onClick={handleLogout}>Logout</Link>
              </div>
            <IoIosMenu className='menu' onClick={()=>setManuToggle(!MenuToggle)}/>
            </div>
           </> 
         ) : ( 
           <> 
            <Link to="/login" className='links'>Login</Link>
            <Link to="/register" className='links'>Register</Link>
          <Link to="/cart" className='links'><SlBasket />({cartLegth})</Link>
          <IoIosMenu className='menu' onClick={()=>setManuToggle(!MenuToggle)}/>

          </> 
         )} 
      </div>
    </div>
  );
};

export default Headers;
