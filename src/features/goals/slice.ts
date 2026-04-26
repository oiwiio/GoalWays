import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalAPI } from '../../types/goal';

interface GoalsState {
  items: GoalAPI[];
  isLoading: boolean;
  error: string | null;
  activeTab: 'in_progress' | 'completed' | 'frozen' | 'archived';
}

const initialState: GoalsState = {
  items: [],
  isLoading: false,
  error: null,
  activeTab: 'in_progress',
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    fetchGoalsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchGoalsSuccess: (state, action: PayloadAction<GoalAPI[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchGoalsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createGoalRequest: (state, action: PayloadAction<Omit<GoalAPI, 'id'>>) => {
      state.isLoading = true;
      state.error = null;
    },
    createGoalSuccess: (state, action: PayloadAction<GoalAPI>) => {
      state.isLoading = false;
      state.items = [action.payload, ...state.items];
    },
    createGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateGoalRequest: (state, action: PayloadAction<GoalAPI>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateGoalSuccess: (state, action: PayloadAction<GoalAPI>) => {
      state.isLoading = false;
      state.items = state.items.map(goal =>
        goal.id === action.payload.id ? action.payload : goal
      );
    },
    updateGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    archiveGoalRequest: (state, action: PayloadAction<string>) => {
    state.isLoading = true;
    state.error = null;
    },
    archiveGoalSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = state.items.map(goal =>
        goal.id === action.payload ? { ...goal, status: 'ARCHIVED' } : goal
      );
    },
    archiveGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    restoreGoalRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    restoreGoalSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = state.items.map(goal =>
        goal.id === action.payload ? { ...goal, status: 'IN_PROGRESS' } : goal
      );
    },
    restoreGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteGoalRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteGoalSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = state.items.filter(goal => goal.id !== action.payload);
    },
    deleteGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<'in_progress' | 'completed' | 'frozen' | 'archived'>) => {
      state.activeTab = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchGoalsRequest,
  fetchGoalsSuccess,
  fetchGoalsFailure,
  createGoalRequest,
  createGoalSuccess,
  createGoalFailure,
  updateGoalRequest,
  updateGoalSuccess,
  updateGoalFailure,
  archiveGoalRequest,
  archiveGoalSuccess,
  archiveGoalFailure,
  restoreGoalRequest,
  restoreGoalSuccess,
  restoreGoalFailure,
  deleteGoalRequest,
  deleteGoalSuccess,
  deleteGoalFailure,
  setActiveTab,
  clearError,
} = goalsSlice.actions;

export default goalsSlice.reducer;