import React, { useEffect, useState } from 'react'

const Home = () => {
    // Products
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          return data;
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

    useEffect(() => {
        getProducts();
        
    }, [])
    
    const [readMore, setReadMore] = useState(false);
  return (
    <div className='p-2'>
        <h1 className='text-3xl'>Products</h1>
        {loading && <p>Loading ...</p>}
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
                                    <button className='bg-blue-500 text-white p-2 mt-2'>Add to Cart</button>
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