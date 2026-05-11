import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AIQuestion } from '../../shared/api/types';

export interface AIGeneratedTask {
  title: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  estimated_minutes?: number;
  selected?: boolean;
}

interface AIState {
  isLoading: boolean;
  error: string | null;
  generatedTasks: AIGeneratedTask[];
  needsClarification: boolean;
  sessionId: string | null;
  questions: AIQuestion[];
  clarificationModalVisible: boolean;
  answers: Record<string, string>;
  resultsModalVisible: boolean;
  currentGoalId: number | null;
}

const initialState: AIState = {
  isLoading: false,
  error: null,
  generatedTasks: [],
  needsClarification: false,
  sessionId: null,
  questions: [],
  clarificationModalVisible: false,
  answers: {},
  resultsModalVisible: false,
  currentGoalId: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    // Генерация плана
    generatePlanRequest: (state, action: PayloadAction<{ goalId: number; prompt?: string }>) => {
      state.isLoading = true;
      state.error = null;
      state.currentGoalId = action.payload.goalId;
      state.needsClarification = false;
      state.questions = [];
      state.sessionId = null;
      state.answers = {};
    },
    generatePlanSuccess: (state, action: PayloadAction<AIGeneratedTask[]>) => {
      state.isLoading = false;
      state.generatedTasks = action.payload.map(task => ({ ...task, selected: true }));
      state.resultsModalVisible = true;
    },
    generatePlanClarification: (state, action: PayloadAction<{ sessionId: string; questions: AIQuestion[] }>) => {
      state.isLoading = false;
      state.needsClarification = true;
      state.sessionId = action.payload.sessionId;
      state.questions = action.payload.questions;
      state.clarificationModalVisible = true;
      action.payload.questions.forEach(q => {
        state.answers[q.id] = '';
      });
    },
    generatePlanFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    //принимает payload
    clarifyPlanRequest: (state, action: PayloadAction<{
      goalId: number;
      sessionId: string;
      answers: Array<{ question_id: string; answer: string }>;
    }>) => {
      state.isLoading = true;
      state.error = null;
      state.currentGoalId = action.payload.goalId;
      state.sessionId = action.payload.sessionId;
    },
    clarifyPlanSuccess: (state, action: PayloadAction<AIGeneratedTask[]>) => {
      state.isLoading = false;
      state.needsClarification = false;
      state.clarificationModalVisible = false;
      state.generatedTasks = action.payload.map(task => ({ ...task, selected: true }));
      state.resultsModalVisible = true;
      state.questions = [];
      state.sessionId = null;
      state.answers = {};
    },
    clarifyPlanFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // Модалка вопросов
    setClarificationModalVisible: (state, action: PayloadAction<boolean>) => {
      state.clarificationModalVisible = action.payload;
      if (!action.payload) {
        state.needsClarification = false;
        state.questions = [];
        state.sessionId = null;
        state.answers = {};
      }
    },
    setAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    clearAnswers: (state) => {
      state.answers = {};
    },
    
    // Модалка результатов
    setResultsModalVisible: (state, action: PayloadAction<boolean>) => {
      state.resultsModalVisible = action.payload;
      if (!action.payload) {
        state.generatedTasks = [];
      }
    },
    toggleTaskSelection: (state, action: PayloadAction<number>) => {
      const task = state.generatedTasks[action.payload];
      if (task) {
        task.selected = !task.selected;
      }
    },
    selectAllTasks: (state) => {
      state.generatedTasks.forEach(task => {
        task.selected = true;
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  generatePlanRequest,
  generatePlanSuccess,
  generatePlanClarification,
  generatePlanFailure,
  clarifyPlanRequest,
  clarifyPlanSuccess,
  clarifyPlanFailure,
  setClarificationModalVisible,
  setAnswer,
  clearAnswers,
  setResultsModalVisible,
  toggleTaskSelection,
  selectAllTasks,
  clearError,
} = aiSlice.actions;

export default aiSlice.reducer;