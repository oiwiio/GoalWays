import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForgotPasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null,
  success: false,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetPasswordRequest: (state, action: PayloadAction<{ email: string }>) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
      state.success = true;
    },
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
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
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearStatus,
} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;