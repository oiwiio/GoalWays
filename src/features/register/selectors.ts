import { RootState } from '../../app/store';

export const selectRegisterIsLoading = (state: RootState) => state.register.isLoading;
export const selectRegisterError = (state: RootState) => state.register.error;
export const selectRegisterSuccess = (state: RootState) => state.register.success;
export const selectRegisterUsername = (state: RootState) => state.register.username;
export const selectRegisterEmail = (state: RootState) => state.register.email;