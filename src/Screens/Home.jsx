import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance';
import { useDispatch } from 'react-redux';
import { fetchUserDetails } from '../slices/userSlice';

const Home = () => {
    // Products
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await fetch('https://fakestoreapi.in/api/products');
          const data = await response.json();
     
            
          
          return data.products;
        } catch (error) {
          console.error('Error fetching the data:', error);
        }
      };
    const getProducts = async () => {
        const products = await fetchProducts();
        setLoading(false);
        setProducts(products);
        console.log(products);
    
    };

    const dispatch =useDispatch();
    useEffect(() => {
        dispatch(fetchUserDetails());
        getProducts();
    }, [])

    const [message, setMessage] = useState('')
    const addtoCart = async (productId) => {

        
        try {
            const response = await axiosInstance.post('/api/user/cart/add', {productId});
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
            
        }
    }
    
    const [readMore, setReadMore] = useState(false);
  return (
    <div className='p-2'>
        <h1 className='text-3xl'>Products</h1>
        {loading && (
            <div className='absolute left-[50%] top-[50%]'>
                <div class="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
                <p>Fetching Products...</p>
            </div>
                    
        )
        }
        {/* Products Container */}
        <div className='grid grid-cols-4 gap-4 m-3'>
            {
                products && (
    
                        products.map(product => (
                            <div key={product.id} className='flex flex-col items-center p-2 bg-white  '>
                                {/* iamge */}
                                <div className='flex'>
                                    <img src={product.image} alt="" className='w-36 h-36 object-contain' />
                                </div>
                                <div className='flex flex-col justify-between h-full mt-4'>
                                    {/* title */}
                                    <h2 className=''>{product.title.slice(0, 30)}...</h2>
                                    {/* decription */}
                                    <p className='mt-2'>
                                        <span className='text-gray-500'>Description:</span>  
                                        <span className='font-thin'>
                                            {readMore ? product.description : product.description.slice(0, 52) }
                                        </span>
                                    </p>
                                    {/* price */}
                                    <p className='mt-2'>Price: ₹{product.price}/-</p>
                                    {/* BTN - add to cart */}
                                    <button className='bg-blue-500 text-white p-2 mt-2' onClick={() => addtoCart(product.id)}>Add to Cart</button>
                                    {message && <p className='text-green-800'>{message}</p>}
                                </div>
                            </div>
                        ))
                    )
            }
        </div>
    </div>
  )
}

export default Home