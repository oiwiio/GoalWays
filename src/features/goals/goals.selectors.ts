import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectGoalsItems = (state: RootState) => state.goals.items;
export const selectGoalsIsLoading = (state: RootState) => state.goals.isLoading;
export const selectGoalsError = (state: RootState) => state.goals.error;
export const selectActiveTab = (state: RootState) => state.goals.activeTab;

// филтр по статусу 
export const selectFilteredGoals = createSelector(
  [selectGoalsItems, selectActiveTab],
  (items, activeTab) => items.filter(goal => 
    activeTab === 'active' ? goal.status === 'active' : goal.status === 'archived'
  )
);

// для подсчета 
export const selectActiveCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'active').length
);

export const selectArchivedCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'archived').length
);