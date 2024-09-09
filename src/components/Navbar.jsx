import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { logout, reset } from '../slices/userSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(reset());
}
   
  return (
    <nav className='flex justify-between items-center p-2 bg-amber-300 w-full'>
        <img src="" alt="Logo" />
        <h1 className='text-2xl'>Smile Shop</h1>
        <div>
          <Link to="/cart" ><button className='bg-white p-1  rounded'>Cart</button> </Link>
          <Link to="/orders" ><button className='bg-white p-1  rounded'>orders</button> </Link>
          <button className='bg-white p-1 rounded' onClick={handleLogout}>Logout </button>

        </div>
    </nav>
  )
}

export default Navbar