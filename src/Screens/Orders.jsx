import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([])
    
    const fetchorders =  async () => {
        try {
            const res = await axiosInstance.get('/api/user/fetchorders');
            setOrders(res.data.orders);
        } catch (error) {
            console.log(error);
            
        }
    }
    const fetchProductDetails = async () => {
        const productDetails = await Promise.all(
            orders.map(async (item) => {
                const productResponse = await fetch(`https://fakestoreapi.in/api/products/${item.productId}`);
                const data = await productResponse.json();
                
                return { ...data.product, orderDate: item.orderDate};
            })
        );
        setProducts(productDetails);
    };
    useEffect(() => {
        fetchorders()
    }, [])
    useEffect(() => {
        fetchProductDetails();
    }, [orders])
    
    console.log(products);
    
  return (
    <div className='p-2'>
        <h1 className='text-3xl'>Orders</h1>
        <ul className='py-3 grid gap-y-2'>
            {products.map((item, index) => (
                <div key={index} className='bg-white rounded-lg flex'>
                    <div className='w-36 h-36'>
                        <img src={item.image} alt="" className='w-full h-full object-contain min-w-36' />
                    </div>
                    <div className='flex flex-col justify-evenly'>
                        <h2>{item.title.slice(0, 50)}</h2>
                        <h2>Price: ₹{item.price}</h2>
                    </div>
                    <div>
                        <h2>Order Date: {item.orderDate.slice(0,10 )}</h2>
                    </div>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default Orders