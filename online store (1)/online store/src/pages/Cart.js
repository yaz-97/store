import React, { useEffect, useState } from 'react';
import Headers from '../components/Headers';
import "../assets/css/cart.css";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TiMinus } from "react-icons/ti";
import Foooter from '../components/Foooter';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const navigate = useNavigate();

  useEffect(() => {  //check the user is login or not
    const loggedIn = sessionStorage.getItem('loggedin');
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);

  //state in which we store the add to cart data intially we get data from localstorage
  const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  let totalPrice = 0;

  //this function is used to find total price
  cartData.forEach(item => {
    totalPrice += item.price * item.quantity;
  });

  //this function is used to remove  a particular product from our cart
  const handleDelete = (index) => {
    const updatedCart = [...cartData];
    updatedCart.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };
// this function is used to clear all the products from cart
  const handleClearCart = () => {
    localStorage.removeItem('cartItems');
    setCartData([]); // Clear the cartData state
  };

  //this function is used to increse the quantity of a particular product
  const handleQuantityInc = (index) => {
    const updatedCart = [...cartData];
    updatedCart[index].quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  //this function is used to decrease the quantity of a particular product
  const handleQuantityDec = (index) => {
    const updatedCart = [...cartData];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartData(updatedCart);
    }
  };
  //this function is used to buy the product which is added in the cart
  const BuyProduct = () => {
    const orders = JSON.parse(localStorage.getItem('order')) || [];
    let userData = {};
    const user = JSON.parse(localStorage.getItem("user"));
    const logId = sessionStorage.getItem('id');
    user.forEach((e, i) => {
      if (logId === e.id) {
        userData = e;
      }
    });

    const orderItem = {
      ...cartData,
      userId: userData.id,
      orderId: uuidv4()
    };

    orders.push(orderItem);
    localStorage.setItem("order", JSON.stringify(orders));
    navigate('/purchaseReceipt', { state: { order: orderItem } });
  };

  return (
    <div>
      <Headers />
      <div className='cartItems'>
        <div className='cartItemCard'>
          <div className='cartItemList'>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((e, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{e.title}</td>
                      <td className='quantityCartBtn'>
                        <FaPlus size={12} style={{ marginRight: "5px" }} onClick={() => handleQuantityInc(i)} />
                        <input type='number' value={e.quantity} style={{ width: "30px" }} readOnly />
                        <TiMinus size={15} onClick={() => handleQuantityDec(i)} />
                      </td>
                      <td>{e.price * e.quantity}</td>
                      <td style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(i)}>
                        <RxCross2 size={20} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}> <hr></hr></td>
                    </tr>
                  </React.Fragment>
                ))}
                <tr>
                  <td>Total:</td>
                  <td>{cartData.length}</td>
                  <td colSpan={2}>${totalPrice}</td>
                </tr>
                <tr>
                  <td colSpan={4}> <hr></hr></td>
                </tr>
              </tbody>
            </table>
            <div className='cartbtn'>
              <button className='cartClear' onClick={handleClearCart}>Clear</button>
              <button className='cartbuy' onClick={BuyProduct}>Buy now</button>
            </div>
          </div>
        </div>
      </div>
      <Foooter />
    </div>
  );
};

export default Cart;
