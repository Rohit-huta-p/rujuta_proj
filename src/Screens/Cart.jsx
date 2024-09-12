import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance';
import { useSelector } from 'react-redux';

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [discount, setDiscount] = useState(0); // State to track discount
    const {cartItems} = useSelector(state => state.user);
    // Predefined coupon codes and discount values
    const couponCode = { "RK2024": 10 }; // Coupon "RK2024" applies a 10% discount
    let total = 0;



    // Fetch product details based on cart items
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
        if (!cartItems) {
            setLoading(false);
        } else {
            fetchProductDetails();
            setLoading(false);
        }
        if (success) {
            const timer = setTimeout(() => {
                setShowMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [cartItems, success]);

    // Handle placing the order
    const placeOrder = async () => {
        const orderIds = [];
        products.map(product => orderIds.push(product.id));
        try {
            const res = await axiosInstance.post("api/user/placeorder", { orderIds });
            if (res.data.success) {
                setSuccess(res.data.success);
                setShowMessage('Order Placed');
               
            };
        } catch (error) {
            console.log(error);
        }
    };

    // Handle applying coupon
    const handleCoupon = () => {
        if (couponCode[appliedCoupon]) {
            const discountPercentage = couponCode[appliedCoupon];
            setDiscount(discountPercentage); // Set discount based on coupon code
            setShowMessage(`Coupon applied! You got ${discountPercentage}% off.`);
        } else {
            setShowMessage('Invalid coupon code!');
        }
    };

    // Calculate total and discount before rendering
    products.forEach((item) => { total += item.price; });
    const totalWithDiscount = total - (total * discount / 100);

    return (
        <div className='h-screen p-2 relative bg-blue-100'>
            <h1 className='text-3xl'>Cart Items</h1>

            {loading && (
                <div className="absolute left-[50%] top-[50%] border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
            )}

            {message && <p className='text-center'>No Items in Cart</p>}

            <ul className='py-3 grid gap-2'>
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

        <div className='flex bg-blue-100 justify-end mt-3'>
            <div className='flex flex-col '>
                {!message && <p className='text-end'>Total: ₹{totalWithDiscount > 0 ? totalWithDiscount : 0}</p>}
                <div className='flex items-center'>
                    <h4 className='mr-2'>Apply Coupon:</h4>
                    <input 
                        type="text" 
                        className='bg-white w-32 rounded' 
                        value={appliedCoupon}
                        onChange={(e) => setAppliedCoupon(e.target.value)} // Update coupon state
                    />
                    <button 
                        className='bg-blue-600 text-white p-1 rounded ml-2' 
                        onClick={handleCoupon}>
                        Apply
                    </button>
                    <p className='text-green-800'>{showMessage}</p>
                </div>

                {!message && (
                    <button 
                        className='bg-blue-600 text-white p-2 rounded mt-2' 
                        onClick={placeOrder}>
                        Order Now
                    </button>
                )}

           
            </div>
        </div>
        </div>
    );
};

export default Cart;
