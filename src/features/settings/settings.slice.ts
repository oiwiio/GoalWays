import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  notifications: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  notifications: true,
  isLoading: false,
  error: null,
};

export const {reducer, name, actions} = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      // очистка данных пользователя 
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
