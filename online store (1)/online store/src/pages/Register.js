import React, { useState } from 'react';
import Headers from '../components/Headers';
import "../assets/css/register.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaCamera, FaUserCircle } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const navigate = useNavigate();
  const IntialValue = {  // intial value of input fields
    id: uuidv4(),
    username: "",
    email: "",
    password: "",
    cpassword: "",
    fname: "",
    lname: "",
    phone: "",
    birthday: "",
    city: "",
    street: "",
    hNo: "",
    image: ""
  };

  const [active, setActive] = useState('AccountInfo'); //state in which we store the active form
  const [inputValue, setInputValue] = useState(IntialValue); // state in which we store inut values
  const [error, setError] = useState(""); //state in which we store error 

  const InputHandler = (e) => { // in this function we handler the input values
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => { // in this function we handle the image value
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setInputValue({ ...inputValue, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const HandleFirstBtn = (e) => { // in this we validate the first form value and redirect to second form
    e.preventDefault();
    if (inputValue.username === "") {
      setError("Username is required");
    } else if (inputValue.email === "") {
      setError("Email is required");
    } else if (inputValue.password === "") {
      setError("Password is required");
    } else if (inputValue.cpassword === "") {
      setError("Confirm password is required");
    } else if (inputValue.password !== inputValue.cpassword) {
      setError("Passwords do not match");
    } else {
      setActive("PersonalInfo");
      setError("");
    }
  };

  const HandleSecBtn = (e) => {  // in this function we vlaidate the second form and then redirect to third form
    e.preventDefault();
    if (inputValue.fname === "") {
      setError("First Name is required");
    } else if (inputValue.lname === "") {
      setError("Last Name is required");
    } else if (inputValue.phone === "") {
      setError("Phone number is required");
    } else if (inputValue.city === "") {
      setError("City is required");
    } else if (inputValue.street === "") {
      setError("Street is required");
    } else if (inputValue.hNo === "") {
      setError("House No is required");
    } else {
      setActive("ProfilePicture");
      setError("");
    }
  };

  const SubmitForm = (e) => { // in this function we first validate and then store all values in localstorage
    e.preventDefault();
    if (inputValue.image === "") {
      setError("Image is required");
    } else {
      // Retrieve existing users from localStorage
      let existingUser = JSON.parse(localStorage.getItem('user')) || [];
    
      // Append the new user to existing users
      existingUser.push(inputValue);

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(existingUser));

      // Clear the form and error
      setInputValue(IntialValue);
      setError("");
      navigate("/login");
    }
  };

  return (
    <div>
      <Headers />
      <div className='registerPage'>
        <div className='registerForm'>
          <div className='registerTop'>
            <Link className='stepslink' id={active === "AccountInfo" ? "Linkactive" : ""}>Step 1</Link>
            <Link className='stepslink' id={active === "PersonalInfo" ? "Linkactive" : ""}>Step 2</Link>
            <Link className='stepslink' id={active === "ProfilePicture" ? "Linkactive" : ""}>Step 3</Link>
          </div>
          {active === "AccountInfo" && (
            <form onSubmit={HandleFirstBtn}>
              <h1>Account Info</h1>
              <div className='inputGrop'>
                <label>Username:</label>
                <input type='text' placeholder='Enter Your username' onChange={InputHandler} value={inputValue.username} name='username' />
              </div>
              <div className='inputGrop'>
                <label>Email:</label>
                <input type='text' placeholder='Enter Your Email' name='email' value={inputValue.email} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>Password:</label>
                <input type='password' placeholder='Enter Your Password' name='password' value={inputValue.password} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>Confirm Password:</label>
                <input type='password' placeholder='Enter Your Confirm Password' name='cpassword' value={inputValue.cpassword} onChange={InputHandler} />
              </div>
              <div className='registerbtn'>
                <button type="submit">Next</button>
              </div>
              <p style={{ color: "red", fontSize: "15px" }}>{error}</p>
              <p>Already have an account? <Link to='/login' className='regi'>Login Now</Link></p>
            </form>
          )}
          {active === "PersonalInfo" && (
            <form onSubmit={HandleSecBtn}>
              <h1>Personal Info</h1>
              <div className='inputGrop'>
                <label>First Name:</label>
                <input type='text' placeholder='First Name' name='fname' value={inputValue.fname} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>Last Name:</label>
                <input type='text' placeholder='Last Name' name='lname' value={inputValue.lname} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>Birthday:</label>
                <input type='date' name='birthday' value={inputValue.birthday} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>Phone:</label>
                <input type='tel' name='phone' value={inputValue.phone} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>City:</label>
                <input type='text' placeholder='City' name='city' value={inputValue.city} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>Street:</label>
                <input type='text' placeholder='Street' name='street' value={inputValue.street} onChange={InputHandler} />
              </div>
              <div className='inputGrop'>
                <label>Number:</label>
                <input type='number' placeholder='House Number' name='hNo' value={inputValue.hNo} onChange={InputHandler} />
              </div>
              <div className='registerbtn'>
                <button type="submit">Register</button>
              </div>
              <p style={{ color: "red", fontSize: "15px" }}>{error}</p>
              <p>              Already have an account? <Link to='/login' className='regi'>Login Now</Link>
              </p>
            </form>
          )}

          {active === "ProfilePicture" && (
            <form onSubmit={SubmitForm}>
              <h1>Profile Picture</h1>
              <div className='profileImage'>
                <div className='proImageCon'>
                  <label htmlFor='image' className='imagepro'>
                    <FaCamera size={20} />
                  </label>
                  <input 
                    type='file' 
                    name='image' 
                    id='image' 
                    className='imageInput' 
                    onChange={handleImageChange} 
                  />
                    <FaUserCircle size={"80%"}  className='profileDefaultImage'/>
                </div>
              </div>
              <div className='registerbtn'>
                <button type="submit">Finish</button>
              </div>
              <p style={{ color: "red", fontSize: "15px" }}>{error}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
