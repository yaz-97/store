import React, { useState, useEffect } from 'react';
import '../assets/css/productdetail.css';
import { useParams } from 'react-router-dom';
import Headers from '../components/Headers';
import img from "../assets/images/product bg.jpg";
import Foooter from '../components/Foooter';

const ProductDetial = () => {
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Load products from localStorage on component 
        let existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        const index = existingProducts.findIndex(product => product.id == id);
        
        if (index !== -1) {
            setProduct(existingProducts[index]);
        }
        
        // Load Product items from localStorage on component 
        let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(existingCartItems);
    }, [id]);

    const handleQuantity = (e) => { // handle product quantity
        setQuantity(e.target.value);
    };

    const addToCart = () => {
        // Check if the product by comparing the id 
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            // Update the quantity of the existing item
            const updatedCartItems = cartItems.map(item => 
                item.id === existingItem.id ? { ...item, quantity: item.quantity + parseInt(quantity) } : item
            );
            
            // Update cartItems state
            setCartItems(updatedCartItems);
            
            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            // Create a new cart item
            const newItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: parseInt(quantity)
            };
            
            // Add the new item to cartItems
            const updatedCartItems = [...cartItems, newItem];
            
            // Update cartItems state
            setCartItems(updatedCartItems);
            
            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
    };

    return (
        <>
            <Headers />
            
            <div className='productDetail'>
                <div className='productDet'>
                    {
                        product.pimage ?
                        <img src={product.pimage} alt='productImage'/>
                    :
                    <img src={img} alt='product-image'/>
}
                    <div className='proDet-content'>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <p className='price'> ${product.price}</p>
                        <div className='quant'>
                            <label>Quantity</label>
                            <input type='number' value={quantity} onChange={handleQuantity}/>
                        </div>
                        <button className='addtocart' onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
                <Foooter/>
        </>
    );
}

export default ProductDetial;
