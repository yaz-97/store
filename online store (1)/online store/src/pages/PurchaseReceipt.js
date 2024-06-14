import React from "react";
import "../assets/css/receipt.css";
import { useLocation } from "react-router-dom";

const PurchaseReceipt = () => {
  const location = useLocation();
  const order = location.state?.order;
  const user = JSON.parse(localStorage.getItem("user"));

  let userData;
  let totalPrice = 0;

  let userData1= {}
  const logId = sessionStorage.getItem('id');
  user.map((e,i)=>{
    if(logId === e.id){
      userData1 = e;
    }
  })

  if (order && userData1 && userData1.id === order.userId) {
    userData = user;
    if (typeof order === 'object') {
      Object.values(order).forEach((item) => {
        const price = parseFloat(item?.price);
        const quantity = parseInt(item?.quantity, 10);

        if (!isNaN(price) && !isNaN(quantity)) {
          totalPrice += price * quantity;
        }
      });
    }
  }

  return (
    <div className="receipt">
      <div id="invoice-POS">
        <center id="top">
          <div className="logo"></div>
          <div className="info">
            <h2>Online Shop</h2>
          </div>
        </center>

        <div id="mid">
          <div className="info">
            <h3>Username: {userData1?.username}</h3>
            <p>
              Address : {userData1?.hNo} {userData1?.street} {userData1?.city}
              <br />
              Email : {userData1?.email}
              <br />
              Phone : {userData1?.phone}
              <br />
            </p>
          </div>
        </div>

        <div id="bot">
          <div id="table">
            <table width={'100%'}>
              <tr className="tabletitle">
                <td className="item">
                  <h2>Item</h2>
                </td>
                <td className="Hours">
                  <h2>Qty</h2>
                </td>
                <td className="Rate">
                  <h2>Sub Total</h2>
                </td>
              </tr>
              {order && typeof order === 'object' && Object.entries(order).map(([key, value], i) => (
                typeof value === 'object' && key !== 'orderId' && key !== 'userId' ? (
                  <tr key={i} className="service">
                    <td className="tableitem"><p className="itemtext">{value.title}</p></td>
                    <td className="tableitem"><p className="itemtext">{value.quantity}</p></td>
                    <td className="tableitem"><p className="itemtext">${value.price * value.quantity}</p></td>
                  </tr>
                ) : null
              ))}
             
              <tr className="tabletitle">
                <td></td>
                <td className="Rate">
                  <h2>tax</h2>
                </td>
                <td className="payment">
                  <h2>$10</h2>
                </td>
              </tr>
              <tr className="tabletitle">
                <td></td>
                <td className="Rate">
                  <h2>Total</h2>
                </td>
                <td className="payment">
                  <h2>${totalPrice.toFixed(2)}</h2>
                </td>
              </tr>
            </table>
          </div>

          <div id="legalcopy">
            <p className="legal">
              <strong>Thank you for your shopping!</strong> your order has been placed successfully
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReceipt;
