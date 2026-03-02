import { RootState } from '../../app/store';

export const selectNotifications = (state: RootState) => state.settings.notifications;
export const selectSettingsIsLoading = (state: RootState) => state.settings.isLoading;
export const selectSettingsError = (state: RootState) => state.settings.error;