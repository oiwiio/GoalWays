import { RootState } from '../../app/store';

export const selectTasksItems = (state: RootState) => state.tasks?.items ?? [];
export const selectTasksIsLoading = (state: RootState) => state.tasks?.isLoading ?? false;
export const selectTasksError = (state: RootState) => state.tasks?.error ?? null;