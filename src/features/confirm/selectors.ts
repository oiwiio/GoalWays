import { RootState } from '../../app/store';

export const selectConfirmIsLoading = (state: RootState) => state.confirm.isLoading;
export const selectConfirmError = (state: RootState) => state.confirm.error;
export const selectConfirmSuccess = (state: RootState) => state.confirm.success;
export const selectConfirmUsername = (state: RootState) => state.confirm.username;