import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectGoalsItems = (state: RootState) => state.goals.items;
export const selectGoalsIsLoading = (state: RootState) => state.goals.isLoading;
export const selectGoalsError = (state: RootState) => state.goals.error;
export const selectActiveTab = (state: RootState) => state.goals.activeTab;

// филтр по статусу 
export const selectFilteredGoals = createSelector(
  [selectGoalsItems, selectActiveTab],
  (items, activeTab) => items.filter(goal => goal.status === activeTab)
);

export const selectInProgressCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'in_progress').length
);

export const selectCompletedCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'completed').length
);

export const selectFrozenCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'frozen').length
);

export const selectArchivedCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'archived').length
);

// сортировка по приоритету (важные сверху)
export const selectSortedGoals = createSelector(
  [selectFilteredGoals],
  (items) => [...items].sort((a, b) => {
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  })
);