import React, { useState } from 'react'
import Headers from '../components/Headers'
import "../assets/css/login.css"
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const IntialValue = { // it is intial values of input
    username: "",
    password: ""
  }

  let [inputVal, setInputVal] = useState(IntialValue) //state in which we store the input values
  let [error,setError]= useState("") // state in which we store error value

  const HandleInput = (e) =>{ //in  this function we handle all inputs and update the states
    e.preventDefault()
    setInputVal({...inputVal,[e.target.name]: e.target.value})
  }

  const SubmitHandler = (e) => {  // in this function we validate the data and then store the data in localstorage
    e.preventDefault()
    if (inputVal.username === ""){ //in this if and else if condition we validate the input values
      setError= "username is required"
    }else if (inputVal.password === ""){
      setError = "password is required"
    }else{
      if (inputVal.username === "admin" && inputVal.password === "ad12343211ad"){
        sessionStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/products')
      }else{ // and in this else part we store the values in localstorage
      const loggedUser = JSON.parse(localStorage.getItem('user'))
      loggedUser.map((e,i)=>{
        if(inputVal.username === e.username && inputVal.password === e.password){
          sessionStorage.setItem('loggedin', 'true');
          sessionStorage.setItem('id', e.id);
          navigate('/profile')
        }else{
          setError("email and password does not exist")
        }
      
      })
    }
    }
  }
  return (
    <div>
        <Headers/>
        <div className='loginPage'>
            <div className='loginForm'>
              <h1>Login</h1>
              <form>
                <div className='inputGrop'>
                  <label>username:</label>
                  <input type='text' placeholder='Enter Your username' name='username' onChange={HandleInput}/>
                </div>
                <div className='inputGrop'>
                  <label>Password:</label>
                  <input type='password' placeholder='Enter Your Password' name='password' onChange={HandleInput}/>
                </div>
                <div className='loginbtn'>
                <button type="submit" onClick={SubmitHandler}>Login</button>
                </div>
                <p style={{color: "red", fontSize: "15px"}}>{error}</p>
                <p>Don't have an account? <Link to='/register' className='regi'>Regsiter Now</Link></p>
              </form >
            </div>
        </div>
    </div>
  )
}

export default Login