import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null)
    const fetchProductDetails = async (id) => {
        try {

          const productResponse = await fetch(`https://fakestoreapi.in/api/products/${id}`);
          const data = await productResponse.json();
          setProduct({...data.product})
        } catch (error) {
          console.error('Error fetching product details:', error);
          return null; 
        }
      };
    useEffect(() => {
        fetchProductDetails(id);
    }, [])
    console.log(product);
    
    
  return (
    <>
    <h1>Product</h1>
    <div className='grid grid-cols-5 gap-x-4 p-2 h-screen'>
      {
        product && (
            <>
                <div className='col-span-2'>
                    <img src={product.image} alt="" className='' />
                </div>
                <div className='col-span-3'>
                    <h1 className='font-bold'>{product.title}</h1>
                    <p className='mt-3'>Category: {product.category}</p>
                    <p className='mt-3'>Brand: {product.brand}</p>
                    <p className='mt-3'>Model: {product.model}</p>
                    <p className='mt-3'>Description: <br />{product.description}</p>
                    <p className='mt-3'>Color: {product.color}</p>
                    <p className='mt-3'>Price: ${product.price}</p>
                </div>
            </>
        )
      }
    </div>
    </>
  )
}

export default Product