import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../types/goal';

interface GoalsState {
  items: Goal[];
  isLoading: boolean;
  error: string | null;
  activeTab: 'active' | 'archived';
}

const initialState: GoalsState = {
  items: [],
  isLoading: false,
  error: null,
  activeTab: 'active',
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    
    // загрузка
    fetchGoalsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchGoalsSuccess: (state, action: PayloadAction<Goal[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchGoalsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // создание 
    createGoalRequest: (state, action: PayloadAction<Omit<Goal, 'id' | 'createdAt'>>) => {
      state.isLoading = true;
      state.error = null;
    },
    createGoalSuccess: (state, action: PayloadAction<Goal>) => {
      state.isLoading = false;
      state.items = [action.payload, ...state.items];
    },
    createGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // архивация
    archiveGoalRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    archiveGoalSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = state.items.map(goal =>
        goal.id === action.payload
          ? { ...goal, status: 'archived' }
          : goal
      );
    },
    archiveGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // переключение таба 
    setActiveTab: (state, action: PayloadAction<'active' | 'archived'>) => {
      state.activeTab = action.payload;
    },

    // клеар ошибки 
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
  archiveGoalRequest,
  archiveGoalSuccess,
  archiveGoalFailure,
  setActiveTab,
  clearError,
} = goalsSlice.actions;

export default goalsSlice.reducer;