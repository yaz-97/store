import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import AdminLayout from '../../components/AdminLayout';
import "../../assets/css/products.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Products = () => {
  // navigate function is used to redirect one page to another
  const navigate = useNavigate();

  // create state to store all products data
  const [productData, setProductData] = useState([]);

  // these useEffect hook will check admin is login or not if admin login then it access this page otherwise redirect to login page 
  useEffect(() => {

    const loggedIn = sessionStorage.getItem('adminLoggedIn'); // in this line we get check the admin login data from session
    if (!loggedIn) {
      navigate('/login'); // in this line we redirect to login page if admin not login
    }

    const data = JSON.parse(localStorage.getItem("products")) || []; // in this line we get the product data from localStorage
    setProductData(data);  //in this line we store all data in state
  }, [navigate]);

  const removeProduct = (id) => {  // this function is used to remove the product data from localstorage
    const updatedProducts = productData.filter(product => product.id !== id); // in this line we check the admin click product add is exist in the product data
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));    // update the local storage after removing a product
    
    // Refresh the component to reflect the changes
    window.location.reload();
  };

  const shortenDescription = (description) => { // this function is used to show short description
    const maxLength = 50; // Set the maximum length of the description
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <div>
      <AdminLayout>
        <div className='productsData'>
          <h1>All Products</h1>
          <table border={1}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((e, i) => (
                <tr key={i}>
                  <td>{e.title}</td>
                  <td>
                    {shortenDescription(e.description)}
                    {e.description.length > 50 && (
                      <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => alert(e.description)}> Show More</span>
                    )}
                  </td>
                  <td>{e.quantity}</td>
                  <td>{e.price}</td>
                  <td>
                    {e.pimage ? (
                      <img src={e.pimage} alt="Uploaded" className='proImage' />
                    ) : (
                      <FaUserCircle size={50} />
                    )}
                  </td>
                  <td className='Actionbtn'>
                    <FaEdit style={{ color: "green" }} size={20} className='productBtn' onClick={() => navigate(`/admin/updateproduct/${e.id}`)} />
                    <MdDelete size={20} style={{ color: "red" }} className='productBtn' onClick={() => removeProduct(e.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Products;
