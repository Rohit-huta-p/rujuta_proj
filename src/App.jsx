import React, { useEffect } from 'react'
import Home from './Screens/Home'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Register from './Screens/Register'
import Login from './Screens/Login'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Cookies from 'js-cookie';
import { reset } from './slices/userSlice'
import Cart from './Screens/Cart'
import Orders from './Screens/Orders'
import Product from './Screens/Product'
const App = () => {
  const {isLogin} = useSelector(state => state.user);
  console.log(isLogin);

  
  return (
    <div className='bg-slate-200'>
      <BrowserRouter >
        <Navbar />
      <Routes>
      {
        isLogin ? (
          <>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<Navigate to="/" />} />
          </>
        ):
        (
          <>
             <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/register" />} />
          </>
        )
        
      }
     

        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App