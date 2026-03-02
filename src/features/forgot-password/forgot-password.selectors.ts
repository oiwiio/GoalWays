import { RootState } from '../../app/store';


export const selectForgotPasswordIsLoading = (state: RootState) => state.forgotPassword?.isLoading ?? false;
export const selectForgotPasswordError = (state: RootState) => state.forgotPassword?.error ?? null;
export const selectForgotPasswordSuccess = (state: RootState) => state.forgotPassword?.success ?? false;