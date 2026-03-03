import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { name, SettingsState } from './settings.slice';

interface State {
    [name]: SettingsState
}

const root = (state: State) => state.settings

const selectNotifications = createSelector([root], rootState => rootState.notifications)
const selectSettingsIsLoading = (state: RootState) => state.settings.isLoading;
const selectSettingsError = (state: RootState) => state.settings.error;

export const selectors = {
    selectNotifications,
    selectSettingsIsLoading,
    selectSettingsError,
}
