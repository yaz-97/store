import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import "../../assets/css/addproduct.css";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    // in this object we store intial values of our inputs
    const initialValue = {
        id: uuidv4(),
        title: "",
        description: "",
        brand: "",
        quantity: "",
        price: "",
        pimage: ""
    };

    const navigate = useNavigate();
    
    useEffect(() => { // this useEffect check admin login or not
        const loggedIn = sessionStorage.getItem('adminLoggedIn');
        if (!loggedIn) {
            navigate('/login');
        }
    }, []);

    const [err, setErr] = useState(""); //this state is used to store error
    const [product, setProduct] = useState(initialValue); //this state is used to store product data

    const handleInput = (e) => {  // in this function we will handle the input value
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value }); // in this function we store input value in our product state
    };

    const handleImageChange = (e) => {  // in this function we handle image value
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProduct({ ...product, pimage: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const addProduct = (e) => { //this function is used to store data in localstorage
        e.preventDefault();

        if (product.title === '') { // this condition is used to validate the input fields
            setErr("Product Title is required");
        } else if (product.description === '') {
            setErr("Product Description is required");
        } else if (product.quantity === '') {
            setErr("Product quantity is required");
        } else if (product.price === "") {
            setErr("Product price is required");
        } else if (product.pimage === "") {
            setErr("Product Image is required");
        } else {
            let existingProducts = JSON.parse(localStorage.getItem('products')) || [];  //getting all products from local storage

            existingProducts.push(product);  //we are pushing our product into the existing products

            localStorage.setItem('products', JSON.stringify(existingProducts));    //storing the products array back into the localStorage

            setProduct(initialValue);    //after adding the product we reset the form empty
            setErr("");
            navigate("/admin/products")
        }
    };

    return (
        <AdminLayout>
            <div className='addProduct'>
                <h1>Add a new product</h1>
                <div className='addProCont'>
                    <form>
                        <div className='inputGroup'>
                            <label htmlFor="title">Title: </label>
                            <input type='text' name='title' id='title' placeholder='Enter Product Title' value={product.title} onChange={handleInput} />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="description">Description: </label>
                            <textarea id='description' name='description' placeholder='Enter Product Description' value={product.description} onChange={handleInput}></textarea>
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="brand">Brand: </label>
                            <input type='text' id='brand' name='brand' placeholder='Enter Product Brand' value={product.brand} onChange={handleInput} />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="quantity">Quantity: </label>
                            <input type='number' id='quantity' name='quantity' placeholder='Enter Product quantity' value={product.quantity} onChange={handleInput} />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="price">Price: </label>
                            <input type='number' id='price' name='price' placeholder='Enter Product Price' value={product.price} onChange={handleInput} />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="image">Image: </label>
                            <input type='file' id='image' name='pimage' onChange={handleImageChange} />
                        </div>
                        <p style={{ color: "red", fontSize: "15px" }}>{err}</p>
                        <div className='addProductBtn'>
                            <button onClick={addProduct}>Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddProduct;
