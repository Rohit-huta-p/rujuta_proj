import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../axiosInstance';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false);
    const [showMessage, setShowMessage] = useState('')

    let total = 0;
    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/api/user/cart/allitems');
           
            setMessage(res.data.message);
            setCartItems(res.data.cartItems);

            
        } catch (error) {
            console.log(error);
            
        }
    }
    const fetchProductDetails = async () => {
        const productDetails = await Promise.all(
            cartItems.map(async (item) => {
                const productResponse = await fetch(`https://fakestoreapi.in/api/products/${item.productId}`);
                const data = await productResponse.json();
                
                return { ...data.product };
            })
        );
        setProducts(productDetails);
    };
    useEffect(() => {
        fetchCartItems()
    }, [])
    useEffect(() => {
        if(!cartItems){

            setLoading(false);
        }else{
            fetchProductDetails();
            setLoading(false);
        }
        if (success) {
            const timer = setTimeout(() => {
                setShowMessage('');
            }, 3000);

            // Clean up the timer when the component unmounts
            return () => clearTimeout(timer);
        }
    }, [cartItems, success])

    // Place Order 
    const placeOrder = async () => {
        const orderIds = [];
        products.map(product => orderIds.push(product.id))
        try{
            const res = await axiosInstance.post("api/user/placeorder", {orderIds});
            if(res.data.success) {
                setSuccess(res.data.success)
                setShowMessage('Order Placed')
                setCartItems([]);
            };
            
        }catch(error){
            console.log(error);
            
        }
        
    }

    console.log(products);
    

    
    
  return (
    <div className='h-screen p-2 relative'>
        <h1 className='text-3xl'>Cart Items</h1>

        {
            loading && 
            <div class=" absolute left-[50%] top-[50%] border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
        }
        {
            message && 
            <p className='text-center'>No Items in Cart</p>
        }
      
        <ul className='py-3 grid gap-y-2'>
            {products.map((item, index) => (
                <div key={index} className='bg-white rounded-lg flex'>
                    <div className='w-36 h-36'>
                        <img src={item.image} alt="" className='w-full h-full object-contain min-w-36' />
                    </div>
                    <div className='flex flex-col justify-evenly'>
                        <h2>{item.title}</h2>
                        <h2>Price: ₹{item.price}</h2>
                        
                    </div>
                </div>
            ))}
        </ul>
        {products.map((item, index) => {total+=item.price})}
        {!message && <p>Total: {total > 0  ? total: 0}</p>}
        {!message && <button className='bg-blue-600 text-white p-2 rounded' onClick={placeOrder}>Order Now</button> }
        
        <p className='text-green-800'>{showMessage}</p>
                
            
        

    </div>
  )
}

export default Cart