import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalAPI } from '../../../../types/goal';

export interface GoalEditFormState {
  // данные формы
  title: string;
  description: string;
  category: string;
  deadline: string;
  startDate: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FROZEN' | 'ARCHIVED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  results: string[];
  
  // cостояние модалки
  isVisible: boolean;
  currentGoalId: number | null;
  originalGoal: GoalAPI | null;
  
  // состояния UI
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
  
  // для результатов
  resultModalVisible: boolean;
  resultText: string;
}

const initialState: GoalEditFormState = {
  title: '',
  description: '',
  category: '',
  deadline: '',
  startDate: '',
  status: 'IN_PROGRESS',
  priority: 'MEDIUM',
  results: [],
  isVisible: false,
  currentGoalId: null,
  originalGoal: null,
  isLoading: false,
  error: null,
  isSaving: false,
  resultModalVisible: false,
  resultText: '',
};

const goalEditModalSlice = createSlice({
  name: 'goalEditModal',
  initialState,
  reducers: {
    // открытие модалки с данными цели
    openModal: (state, action: PayloadAction<GoalAPI>) => {
      const goal = action.payload;
      state.isVisible = true;
      state.currentGoalId = typeof goal.id === 'number' ? goal.id : parseInt(goal.id, 10);
      state.originalGoal = goal;
      
      // заполняем форму данными цели
      state.title = goal.title || '';
      state.description = goal.description || '';
      state.startDate = goal.startdate || goal.start_date || '';
      state.priority = goal.priority;
      state.deadline = goal.deadline || '';
      state.category = goal.category || '';
      state.status = goal.status;
      state.results = goal.results || [];
      state.error = null;
    },
    
    // закрытие модалки
    closeModal: (state) => {
      state.isVisible = false;
      state.currentGoalId = null;
      state.originalGoal = null;
      state.error = null;
      state.resultModalVisible = false;
      state.resultText = '';
    },
    
    // CRUD операции над формой
    setTitle: (state, action: PayloadAction<string>) => { state.title = action.payload; },
    setDescription: (state, action: PayloadAction<string>) => { state.description = action.payload; },
    setCategory: (state, action: PayloadAction<string>) => { state.category = action.payload; },
    setDeadline: (state, action: PayloadAction<string>) => { state.deadline = action.payload; },
    setStartDate: (state, action: PayloadAction<string>) => { state.startDate = action.payload; },
    setStatus: (state, action: PayloadAction<GoalEditFormState['status']>) => { state.status = action.payload; },
    setPriority: (state, action: PayloadAction<GoalEditFormState['priority']>) => { state.priority = action.payload; },
    
    // результаты
    addResult: (state, action: PayloadAction<string>) => { state.results.push(action.payload); },
    removeResult: (state, action: PayloadAction<number>) => { state.results.splice(action.payload, 1); },
    clearResults: (state) => { state.results = []; },
    
    // модалка добавления результата
    openResultModal: (state) => { state.resultModalVisible = true; },
    closeResultModal: (state) => { 
      state.resultModalVisible = false; 
      state.resultText = '';
    },
    setResultText: (state, action: PayloadAction<string>) => { state.resultText = action.payload; },
    
    // состояния загрузки и ошибок
    setSaving: (state, action: PayloadAction<boolean>) => { state.isSaving = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; },
    clearError: (state) => { state.error = null; },
    
    // сброс всей формы
    resetForm: () => initialState,
  },
});

export const {
  openModal,
  closeModal,
  setTitle,
  setDescription,
  setCategory,
  setDeadline,
  setStartDate,
  setStatus,
  setPriority,
  addResult,
  removeResult,
  clearResults,
  openResultModal,
  closeResultModal,
  setResultText,
  setSaving,
  setError,
  clearError,
  resetForm,
} = goalEditModalSlice.actions;

export default goalEditModalSlice.reducer;