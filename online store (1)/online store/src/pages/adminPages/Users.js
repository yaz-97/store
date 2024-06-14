import React, { useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import "../../assets/css/user.css"
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const Users = () => {

    const navigate = useNavigate()
  useEffect(()=>{ //check admin login or not
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if(!loggedIn){
      navigate('/login')
    }
  })
     let userData = JSON.parse(localStorage.getItem('user')); // get user data
     const deleteUser = (id) =>{ // this function is used to delete the user
        let existingUsers = JSON.parse(localStorage.getItem('user')) || [];
        const updatedUser = existingUsers.filter(user => user.id !== id);
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Refresh the component to reflect the changes
    window.location.reload();
     }
  return (
    <AdminLayout>
        <div className='userList'>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    userData.map((e,i)=>(
                        <tr key={i}>
                            <td>{e.username}</td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td>{e.hNo} {e.street} {e.city}</td>
                            <td><MdDelete color='red' className='deleteIcon' onClick={() =>deleteUser(e.id)}/></td>
                        </tr>
                    ))
                   }
                </tbody>
            </table>
        </div>
    </AdminLayout>
  )
}

export default Users