import React, { useState } from 'react';
import Headers from '../components/Headers';
import img from "../assets/images/product bg.jpg";
import "../assets/css/product.css";
import { Link, useNavigate } from 'react-router-dom';
import Foooter from '../components/Foooter';
import { MdFilterList } from "react-icons/md";
const Product = () => {
  const navigate = useNavigate();
  const productData = JSON.parse(localStorage.getItem('products')); //variable in which store the products data
  const [SelectedFilter,setSelectedOption] = useState("All") //handle filter selected value
  const  [filteredProducts, setFilteredProducts] = useState([...productData]);  // state in which store the product data
  const handleChange = (e) => { // handel input value
    handleFilterChange(e.target.value);
}
  
const handleFilterChange = (value) => { // set the state of selected option with user's selection
  switch (value) {  //switch condition if which we check the user selection and filter the product according to the user selection
      case "All":
          setFilteredProducts(productData);
          break;
      default:
          setFilteredProducts(productData.filter(item => item.brand === value));
          break;
  }
}
  console.log(SelectedFilter)
  return (
    <div>
      <Headers />
      <div className='proFilter'>
      <div className="filter-dropdown">
            <MdFilterList className="filter-icon"/>
            <select name='filterOption' onChange={handleChange}>
                <option value="">All</option>
                <option value="AUTOBIOGRAPHY">AUTOBIOGRAPHY</option>
                <option value="monster-series">monster-series</option>
                <option value="magic-oud-series">magic-oud-series</option>
                <option value="killer-oud-range">killer-oud-range</option>
            </select>
        </div>
        </div>
      <div className='product'> 
        <div className='productCard'>
          {filteredProducts ? (
            filteredProducts.map((e, i) => (
              <div className='proCards' key={i} onClick={() => navigate(`/productdetail/${e.id}`)}>
                {e.pimage ? (
                  <img src={e.pimage} alt='productImage' className='productImage' />
                ) : (
                  <img src={img} alt='productImage' />
                )}
                <div className='proContent'>
                  <div className='proleft'>
                    <h3>{e.title}</h3>
                    <span>${e.price}</span>
                  </div>
                  <div className='proRight'>
                    <button>Buy</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No product Available</h1>
          )}
        </div>
      </div>
      <Foooter />
    </div>
  );
}

export default Product;
