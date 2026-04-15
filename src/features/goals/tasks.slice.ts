import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/goal';

interface TasksState {
  items: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest: (state, action: PayloadAction<number>) => {
    state.isLoading = true;
    state.error = null;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTaskRequest: (state, action: PayloadAction<{ goalId: number; data: any }>) => {
    state.isLoading = true;
    },
    createTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.isLoading = false;
      state.items = [action.payload, ...state.items];
    },
    createTaskFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTaskRequest: (state, action: PayloadAction<{ goalId: number; taskId: number; data: any }>) => {
    state.isLoading = true;
    },
    updateTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.isLoading = false;
      state.items = state.items.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    updateTaskFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteTaskRequest: (state, action: PayloadAction<{ goalId: number; taskId: number }>) => {
    state.isLoading = true;
    },
    deleteTaskSuccess: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    deleteTaskFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearTasksError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  clearTasksError,
} = tasksSlice.actions;

export default tasksSlice.reducer;