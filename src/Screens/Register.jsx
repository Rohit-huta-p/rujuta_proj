import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../slices/userSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {formError, getErrorMessage} from '../utilities/FormError';



const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const data = {name, email, password};
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const {loading, error, message} = useSelector( (state) => state.user);

    if(message){
        setTimeout(() => {
            navigate('/login');
          }, 3000)
    }
    const handleRegister = (e) => {
        e.preventDefault();
        const validationErrors = formError(data);
        console.log(validationErrors);
        
        setErrors(validationErrors);
        if(validationErrors.length == 0){
            try {
                const register_data = {name, email, password};
                dispatch(registerUser(register_data));
            
            } catch (e) {
                console.log(error);
                
            }
        }else {
            return null;
        }
    }

  
    useEffect(() => {
      dispatch(reset())
      
    }, [])

 

    
   

    return (
        <div className='h-screen'>
            <div className='flex justify-center items-center h-full'>
                {/* card */}
                <div className='relative shadow-inner shadow-xl bg-white w-5/6 md:w-4/6 py-[2rem] flex flex-col items-center justify-center rounded md:rounded-[4%]'>  

                    <h1 className='text-3xl p-4'>
                       Register
                    </h1>

                    {/* form */}
                    <form onSubmit={ (e) => handleRegister(e) } className='w-full flex flex-col items-center'>
                        <div className='p-4 w-10/12'>
                           <div className=''>
                                <input type="text" placeholder='Name' className='w-full p-2 bg-transparent focus:outline-none' 
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}/>
                                <hr />
                                {getErrorMessage('name', errors)}
                            </div>
                        
                            <div>
                                <input type="email" placeholder='Email' className='w-full p-2 bg-transparent focus:outline-none'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                />
                                <hr />
                                {getErrorMessage('email', errors)}
                            </div>
                            <div>
                                <input type="password" placeholder='New Password' className=' w-full p-2 bg-transparent focus:outline-none' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value) }/>
                                <hr />
                                {getErrorMessage('password', errors)}
                            </div>
                        </div>
                        <button className='bg-blue-700 text-white px-3 py-2 rounded mt-4 w-9/12'>
                            Register
                        </button>
                    </form>

                    {/* <Loader loading={loading}/> */}
                    {error && <p className='text-sm' style={{ color: 'red' }}>Registration failed: {error}</p>}
                    {
                        message && (
                            <div>
                                <p className='font-thin bg-green-200'>User created Successfully.</p>
                                <p className='bg-green-200'>Redirecting to login...</p>
                            </div>
                        )
                    }


                    <div className='flex justify-start w-9/12 mt-2'>
                        <p className=''>
                         Already registered?
                        <button className='text-blue-900'>
                            <Link to='/login'>Login Here</Link>    
                        </button>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register