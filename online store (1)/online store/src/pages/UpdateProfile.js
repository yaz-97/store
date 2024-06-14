import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../assets/css/updateprofile.css"
import Headers from '../components/Headers';
import   Foooter from '../components/Foooter';
const UpdateProfile = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const IntialVlaue = { // intial values
        fname: "",
        lname: "" ,
        username: "",
        phone: "",
        city: "",
        street: "",
        hNo: ""
    }
    const [error,setError] = useState("") // store error values
    const [Data, setData] = useState(IntialVlaue) // store user data
    useEffect(()=>{ // check your login or not
      const loggedIn = sessionStorage.getItem('loggedin');
      if(!loggedIn){
        navigate('/login')
      } 
      let existingUser = JSON.parse(localStorage.getItem('user')) || []; //get the user data from localstorage
        const index = existingUser.findIndex(user => user.id === id); //find the loggin user data from the data which we fetch from localstorage
        
        if (index !== -1) { //if data find then store the data in state
            setData(existingUser[index]);
        }
    },[id])
   
    const handleInput = (e) => {  //this function handle the input values
        e.preventDefault();
        setData({ ...Data, [e.target.name]: e.target.value });
    }
    const UpdateUser = (e) =>{  // this function is for update the user data
        e.preventDefault()

        if (Data.fname ===""){
            setError("First name is required")
        }else if(Data.lname===""){
            setError("last name is required")
        }else if(Data.username === ""){
            setError("username is required")
        }else if(Data.phone === ""){
            setError("Phone number is required")
        }else if (Data.city===""){
            setError("City is required")
        }else if (Data.street === ""){
            setError("Street is required")
        }else if(Data.hNo ===""){
            setError("House number is required")
        }else{
            // Retrieve existing user from localStorage
            let existingData = JSON.parse(localStorage.getItem('user')) || [];

            // Find the index of the user with the given id
            const index = existingData.findIndex(user => user.id === id);

            if (index !== -1) {
                // Update the user at the found index
                existingData[index] = Data;

                // Update localStorage
                localStorage.setItem('user', JSON.stringify(existingData));

                navigate('/profile')
            }
        }
    }
  return (
    <>
    <Headers/>
    <div className='updateProfile'>
        <h1>Update Profile</h1>
        <div className='proUpdate'>
            <form>
                <div className='InputGroup'>
                    <label>First Name:</label>
                    <input type='text' placeholder='Enter Your First Name' value={Data.fname} name='fname' onChange={handleInput}/>
                </div>
                <div className='InputGroup'>
                    <label>Last Name:</label>
                    <input type='text' placeholder='Enter Your Last Name'value={Data.lname} name='lname' onChange={handleInput}/>
                </div>
                <div className='InputGroup'>
                    <label> username:</label>
                    <input type='text' placeholder='Enter Your username' value={Data.username} name='username' onChange={handleInput}/>
                </div>
                <div className='InputGroup'>
                    <label>Phone:</label>
                    <input type='tel' placeholder='Enter Your Phone Number' value={Data.phone} name='phone' onChange={handleInput}/>
                </div>
                <div className='InputGroup'>
                    <label>City:</label>
                    <input type='text' placeholder='Enter Your  City' value={Data.city} name='city' onChange={handleInput}/>
                </div>
                <div className='InputGroup'>
                    <label>Street:</label>
                    <input type='text' placeholder='Enter Your Street' value={Data.street} name='street' onChange={handleInput}/>
                </div>
                <div className='InputGroup'>
                    <label>House Number:</label>
                    <input type='text' placeholder='Enter Your House Number' value={Data.hNo} name='hNo' onChange={handleInput}/>
                </div>
                <div className='proupdateBtn'>
                <button type="submit" onClick={UpdateUser}>Update</button>
                </div>
            </form>
        </div>
    </div>
    <Foooter/>
    </>
  )
}

export default UpdateProfile