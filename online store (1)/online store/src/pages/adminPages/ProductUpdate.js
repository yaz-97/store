import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const ProductUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    let [err, setErr] = useState(''); //error  message store
    let [product, setProduct] = useState({ //intial values
        title: "",
        description: "",
        quantity: "",
        price: "",
        pimage: ""
    });

    

    useEffect(() => { //check admin loggin or not
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if(!loggedIn){
      navigate('/login')
    }
        let existingProducts = JSON.parse(localStorage.getItem('products')) || []; // get product data from local storage
        const index = existingProducts.findIndex(product => product.id === id); 
        
        if (index !== -1) {
            setProduct(existingProducts[index]);
        }
    }, [id]);

    const handleInput = (e) => { //handle input values
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value });
    }
    const handleImageChange = (e) => { //handle image value
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProduct({ ...product, pimage: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const updateProduct = (e) => {  // in this function first validate all the vlaues and then store in localstorage
        e.preventDefault();

        if (product.title === '') {
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
            // Retrieve existing products from localStorage
            let existingProducts = JSON.parse(localStorage.getItem('products')) || [];

            // Find the index of the product with the given id
            const index = existingProducts.findIndex(prod => prod.id === id);

            if (index !== -1) {
                // Update the product at the found index
                existingProducts[index] = product;

                // Update localStorage
                localStorage.setItem('products', JSON.stringify(existingProducts));

                navigate('/admin/products')
            }
        }
    }

    return (
        <AdminLayout>
            <div className='addProduct'>
                <h1>Update Product</h1>
                <div className='addProCont'>
                    <form onSubmit={updateProduct}>
                        <div className='inputGroup'>
                            <label htmlFor="title">Title: </label>
                            <input type='text' name='title' id='title' placeholder='Enter Product Title' value={product.title} onChange={handleInput} />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="description">Description: </label>
                            <textarea id='description' name='description' placeholder='Enter Product Description' value={product.description} onChange={handleInput}></textarea>
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
                            <input type='file' id='image' name='pimage'  onChange={handleImageChange} />
                        </div>
                        <p style={{ color: "red", fontSize: "15px" }}>{err}</p>
                        <div className='addProductBtn'>
                            <button type="submit">Update Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default ProductUpdate;
