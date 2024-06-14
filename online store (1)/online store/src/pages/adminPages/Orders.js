import React, { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import "../../assets/css/orders.css";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  let orderData= {} // store orders data

  useEffect(() => { // check the admin login or not
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!loggedIn) {
      navigate('/login');
    }
  }, [navigate]);
  let ordersList=[]; 
  const orders = JSON.parse(localStorage.getItem("order")); //get product data form localstorage
  const user = JSON.parse(localStorage.getItem("user")); //get user data from localstorage
  orders.forEach((e)=>{
    console.log(e)
    orderData = e
  })
  let userData = [];
  
  let totalPrice = 0;

  if (orders && typeof orders === "object" && user) {
    user.forEach((e) => {
      console.log(e.id)
      if (orderData.userId === e.id) {
        userData = e;
      }
    });

    Object.values(orderData).forEach((e) => {
      if (e.userId === user.id) {
        ordersList.push(e);
      }
    });

    ordersList.forEach((e) => {
      const price = parseFloat(e.price);
      const quantity = parseInt(e.quantity, 10);

      if (!isNaN(price) && !isNaN(quantity)) {
        totalPrice += price * quantity;
      }
    });
  }

  return (
    <div>
      <AdminLayout>
        <div className="orders">
          <h1>All Users</h1>
          <table border={1}>
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Username</th>
                <th>Address</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order, i) => (
                <tr key={i} className="service">
                  <td className="tableitem">
                    <p className="itemtext">{orderData.orderId}</p>
                  </td>
                  <td>{userData.username}</td>
                  <td className="tableitem">
                    <p className="itemtext">
                      {userData ? `${userData.hNo} ${userData.street} ${userData.city}` : ''}
                    </p>
                  </td>
                  <td className="tableitem">
                    <p className="itemtext">{userData ? userData.phone : ''}</p>
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

export default Orders;
