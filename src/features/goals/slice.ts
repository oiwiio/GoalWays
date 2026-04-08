import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../types/goal';

interface GoalsState {
  items: Goal[];
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
    
    // загрузка целей
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

    // создание цели
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

    // редактирование цели
    updateGoalRequest: (state, action: PayloadAction<Goal>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateGoalSuccess: (state, action: PayloadAction<Goal>) => {
      state.isLoading = false;
      state.items = state.items.map(goal =>
        goal.id === action.payload.id ? action.payload : goal
      );
    },
    updateGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // архивирование цели
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

    // восстановление из архива
    restoreGoalRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    restoreGoalSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = state.items.map(goal =>
        goal.id === action.payload
          ? { ...goal, status: 'in_progress' }
          : goal
      );
    },
    restoreGoalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  удаление цели
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

    // переключение таба
    setActiveTab: (state, action: PayloadAction<'in_progress' | 'completed' | 'frozen' | 'archived'>) => {
      state.activeTab = action.payload;
    },

    // очистка ошибки
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