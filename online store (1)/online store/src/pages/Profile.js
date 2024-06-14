import React, { useEffect } from 'react';
import Headers from '../components/Headers';
import { FaUserCircle } from "react-icons/fa";
import "../assets/css/profile.css";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // check user login or not
    const loggedIn = sessionStorage.getItem('loggedin');
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);

  let Islogged = {};
  const LoggedUser = JSON.parse(localStorage.getItem('user'));  // get the data of logged-in user
  const logId = sessionStorage.getItem('id');    // get the id of logged-in user

  LoggedUser.map((e, i) => {  // check if the id exists in localStorage data, if it exists then store the value in variable
    if (logId === e.id) {
      Islogged = e;
    }
  });

  const handleDeactivate = () => {
    // Remove user data from localStorage
    const updatedUsers = LoggedUser.filter(user => user.id !== Islogged.id);
    localStorage.setItem('user', JSON.stringify(updatedUsers));
    sessionStorage.removeItem('loggedin');
    navigate('/login');
  };

  return (
    <div>
      <Headers />
      <div className='profilePage'>
        <div className='profile'>
          {Islogged.image ? (
            <img src={Islogged.image} alt="Uploaded" className='profilImage' />
          ) : (
            <FaUserCircle size={200} />
          )}

          <div className='procontent'>
            <h1>{Islogged.username}</h1>
            <h3>{Islogged.email}</h3>
          </div>
          <div className='proMoreInfo'>
            <div className='infocontent'>
              <h3>Birthday</h3>
              <p>{Islogged.birthday}</p>
            </div>
            <div className='infocontent'>
              <h3>City</h3>
              <p>{Islogged.city}</p>
            </div>
            <div className='infocontent'>
              <h3>Street</h3>
              <p>{Islogged.street}</p>
            </div>
          </div>
          <div className='profileBtns'>
            <button className='updatebtn' onClick={handleDeactivate}>Deactivate</button>
            <button className='updatebtn' onClick={() => navigate(`/updateProfile/${Islogged.id}`)}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
