import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../slices/userSlice';
import { Link } from 'react-router-dom';


// import Loader from '../components/Loader';
import {formError, getErrorMessage} from '../utilities/FormError';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = {email, password};
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const {loading, error} = useSelector( (state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
      
        const login_data = {email, password};
            const validationErrors = formError(data);
            setErrors(validationErrors);
            if(validationErrors.length == 0){
                try {
                    dispatch(loginUser(login_data));
                    
                } catch (e) {
                    console.log(e);
                }
            }else{
                console.log('Validation errors');
            }
    }

    useEffect(() => {
        dispatch(reset());
    }, [])

    
    
  return (
    <div className='h-screen'>
    <div className='flex justify-center items-center h-full'>
        {/* card */}
        <div className='relative shadow-inner shadow-xl bg-white w-4/6 md:w-3/6 py-[4rem] px-4 flex flex-col items-center justify-center rounded md:rounded-[4%]'>  

            <h1 className='text-3xl p-4'>
               Login
            </h1>

            {/* form */}
            <form onSubmit={ handleLogin } className='w-full flex flex-col items-center'>
                <div className='px-1 w-9/12'>
                
                    <div>
             
                        <input type="email" placeholder='Email' className='w-full p-3 bg-transparent focus:outline-none transition-all '
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                        />
                        <hr />
                        {getErrorMessage('email', errors)}
                    </div>
                    <div>
           
                        <input type="password" placeholder='Password' className='w-full p-3 bg-transparent focus:outline-none' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value) }/>
                        <hr />
                        {getErrorMessage('password',errors)}
                    </div>
                </div>
                <button className='bg-blue-700 text-white px-3 py-2 rounded mt-4 w-9/12'>
                    Login
                </button>
            </form>
           {/* <Loader loading={loading}/> */}

            {error && <p className='text-sm text-center mt-2' style={{ color: 'red' }}>{error}</p>}


            <div className='flex justify-start w-9/12 mt-2'>
                <p className=''>
                    Don't have an account?
                    <Link to='/signup' className='text-blue-700'> Register</Link>
                </p>
                
            </div>
        </div>
    </div>
</div>
  )
}

export default Login