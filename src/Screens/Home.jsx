import React, { useEffect, useMemo, useState } from 'react'
import axiosInstance from '../axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, fetchUserDetails } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';

const Home = () => {
    // Products
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [cartIds, setCartIds] = useState([])

    const {cartItems} = useSelector(state => state.user)

    
    const dispatch = useDispatch();
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


    useEffect(() => {
        
        getProducts();
    }, [])

    const [message, setMessage] = useState('')
    const addtoCart = async (productId) => {

        
        try {
            
            const response = await axiosInstance.post('/api/user/cart/add', {productId});
            setMessage(response.data.message);
            setCartIds([...cartIds, productId]);
      
            dispatch(fetchCartItems());
        } catch (error) {
            console.log(error);
            
        }
    }
    const navigate = useNavigate();
    const [readMore, setReadMore] = useState(false);
    const showProduct = (id) => {
        navigate(`/product/${id}`)
    }


    const isInCart = (productId) => {
        return cartItems.some((item) => item.productId === productId);
    };
     // Remove from Cart
     const removeFromCart = async (productId) => {
        try {
            const response = await axiosInstance.post(`/api/user/cart/remove`, {productId});
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };


    // SEARCH
    const [query, setQuery] = useState(''); // Search query state

    const [sortOrder, setSortOrder] = useState('none'); // State to store sorting order

    const [minPrice, setMinPrice] = useState(0);        
    const [maxPrice, setMaxPrice] = useState(1000); 
    const [selectedCategory, setSelectedCategory] = useState('all'); // State for category
    const filteredProducts = useMemo(() => {
        const searchedProducts = products.filter(
            (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        return searchedProducts
        .filter(product => product.price >= minPrice && product.price <= maxPrice) 
        .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
        .sort((a, b) => {
            if (sortOrder === 'low-to-high') {
                return a.price - b.price;
            } else if (sortOrder === 'high-to-low') {
                return b.price - a.price;
            } else {
                return 0; 
            }
        });
    }, [products,query, minPrice, maxPrice,sortOrder, selectedCategory ])
   



  return (
    <div className='p-2'>
        <div className='flex justify-between'>
            <h1 className='text-3xl'>Products</h1>
            <div className='flex flex-col items-end'>
                {/* SEARCH */}
                <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update the search query
                className="border p-2 rounded"
            />



           

                {/* Sorting Option */}
                <div className="mb-4">
                        <div className='flex'>
                         
                    {/* Filter */}
                        <div className="filter-container">
                            <label>Price Range:</label>
                            <input
                                type="text"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                className="border py-1 rounded w-16 "
                            />

                            <label>-</label>
                            <input
                                type="text"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="border p-2 rounded w-16"
                            />
                        </div>
                           
                        </div>
                    </div>
                     {/* Category sorting */}
                     <div>
                                <select
                                    id="category"
                                    className="border rounded p-2"
                                    value={selectedCategory} // Use selectedCategory state here
                                    onChange={(e) => setSelectedCategory(e.target.value)} // Update category state on change
                                >
                                    <option value="all">All Categories</option>
                                    {Array.from(new Set(products.map(product => product.category))) // Get unique categories
                                        .map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                    <div>
                        <select
                            id="price"
                            className="border rounded p-2"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="none">Price: None</option>
                            <option value="low-to-high">Price: Low to High</option>
                            <option value="high-to-low">Price: High to Low</option>
                        </select>
                    </div>
               
            </div>
        </div>

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
    
                        filteredProducts.map(product => (
                            
                            <div key={product.id} className='flex flex-col items-center p-2 bg-white ' >
                                {/* iamge */}
                                <div className='flex'>
                                    <img src={product.image} alt="" className='w-36 h-36 object-contain' />
                                </div>
                                <div className='flex flex-col justify-between h-full mt-4'>
                                    {/* title */}
                                    <h2 className='cursor-pointer' onClick={() => showProduct(product.id)}>{product.title.slice(0, 30)}...</h2>
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
                                    <button className='bg-blue-500 text-white p-2 mt-2'   onClick={() => (isInCart(product.id) ? removeFromCart(product.id) : addtoCart(product.id))}>
                                        {isInCart(product.id) ? 'Remove from cart' : 'Add to Cart'}
                                    </button>
                                    {/* {message && <p className='text-green-800'>{isInCart(product.id) ? 'Product Added' : ''}</p>} */}
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