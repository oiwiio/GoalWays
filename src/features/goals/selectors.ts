import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectGoalsItems = (state: RootState) => state.goals.items;
export const selectGoalsIsLoading = (state: RootState) => state.goals.isLoading;
export const selectGoalsError = (state: RootState) => state.goals.error;
export const selectActiveTab = (state: RootState) => state.goals.activeTab;

// филтр по статусу 
export const selectFilteredGoals = createSelector(
  [selectGoalsItems, selectActiveTab],
  (items, activeTab) => {
    
    const statusMap: Record<string, string> = {
      'in_progress': 'IN_PROGRESS',
      'completed': 'COMPLETED',
      'frozen': 'FROZEN',
      'archived': 'ARCHIVED',
    };
    const targetStatus = statusMap[activeTab];
    return items.filter(goal => goal.status === targetStatus);
  }
);

export const selectInProgressCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'IN_PROGRESS').length
);

export const selectCompletedCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'COMPLETED').length
);

export const selectFrozenCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'FROZEN').length
);

export const selectArchivedCount = createSelector(
  [selectGoalsItems],
  (items) => items.filter(g => g.status === 'ARCHIVED').length
);

// сортировка по приоритету (важные сверху)
export const selectSortedGoals = createSelector(
  [selectFilteredGoals],
  (items) => [...items].sort((a, b) => {
    const priorityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
  })
);