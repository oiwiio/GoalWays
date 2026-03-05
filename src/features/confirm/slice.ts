import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfirmState {
  username: string | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ConfirmState = {
  username: null,
  isLoading: false,
  error: null,
  success: false,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    confirmRequest: (state, action: PayloadAction<{ 
      username: string; 
      code: string 
    }>) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
      state.username = action.payload.username;
    },
    confirmSuccess: (state) => {
      state.isLoading = false;
      state.success = true;
    },
    confirmFailure: (state, action: PayloadAction<string>) => {
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
  confirmRequest, 
  confirmSuccess, 
  confirmFailure, 
  clearStatus 
} = confirmSlice.actions;

export default confirmSlice.reducer;