import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SettingsState } from './slice';

const root = (state: RootState) => state.settings;

export const selectNotifications = createSelector(
  [root],
  (rootState) => rootState.notifications
);

export const selectSettingsIsLoading = (state: RootState) => state.settings.isLoading;
export const selectSettingsError = (state: RootState) => state.settings.error;