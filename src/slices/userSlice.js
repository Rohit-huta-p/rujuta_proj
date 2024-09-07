import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axiosInstance from "../axiosInstance.js";

export const registerUser = createAsyncThunk(
    'user/register',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`/api/user/register`, data,
                {
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
         
            return response.data;
        } catch (error) {
            console.log('Error:', error); 
            return rejectWithValue(error.response.data);
        }
    }
)



export const loginUser = createAsyncThunk(
    'user/login',
    async (data, {rejectWithValue}) => {
        try {
           
            const response = await axiosInstance.post(`/api/user/login`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
  
            return response.data;
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/api/user/logout`)

            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/api/user/fetchUserDetails`);
          
            return response.data;
          } catch (error) {
            if (error.response && error.response.status === 401) {
              Cookies.remove('token'); 
              window.location.href = '/login'; 
              return rejectWithValue({ message: 'Token expired' });
            } else {
              return rejectWithValue({ message: error.message });
            }
          }
    }
)



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        status: null,
        error: null,
        message: null,
        isLogin: false,
    },
    reducers: {
        reset: (state) => {
            state.error = null;
            state.isLogin = false;
            state.loading = false;
            state.message = null;
            state.status = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // Register cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
        
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })


        // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                Cookies.set("token", action.payload.token);
                state.loading = false;
                state.error = null;
                state.isLogin = true;
        
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error ? action.payload.error : "Server error";
                
            }
        )


        // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                Cookies.remove("token");
                state.loading = false;
                state.error = null;
                state.isLogin = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = null;
            })

        // fetchUserDetails
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
        
                
                state.status = true;
                state.isLogin = true; 
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.user = null
                state.loading = false;
                state.error = action.payload.error;
                state.status = false;
                state.message = action.payload.message;
                state.isLogin = false; 
            })

         

    }
})

export const {reset} = userSlice.actions;
export default userSlice.reducer;