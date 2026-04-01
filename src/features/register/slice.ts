import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  username: string | null;
  email: string | null;
}

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  success: false,
  username: null,
  email: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerRequest: (state, action: PayloadAction<{ 
      username: string;   
      email: string; 
      password: string 
    }>) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    
    registerSuccess: (state) => {
      state.isLoading = false;
      state.success = true;
    },
    
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
});

export const { 
  registerRequest, 
  registerSuccess, 
  registerFailure, 
  clearStatus 
} = registerSlice.actions;

export default registerSlice.reducer;