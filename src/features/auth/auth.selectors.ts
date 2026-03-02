import { RootState } from '../../app/store';

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;