import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  generatePlanRequest,
  generatePlanSuccess,
  generatePlanClarification,
  generatePlanFailure,
  clarifyPlanRequest,
  clarifyPlanSuccess,
  clarifyPlanFailure,
} from './slice';
import { aiApi } from '../../shared/api/ai';
import { AIPlanResponse, AIClarifyResponse } from '../../shared/api/types';
import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';

type GeneratePlanResponse = AxiosResponse<AIPlanResponse>;
type ClarifyPlanResponse = AxiosResponse<AIClarifyResponse>;

function* handleGeneratePlan(action: PayloadAction<number>): Generator<any, void, GeneratePlanResponse> {
  try {
    const goalId = action.payload;
    console.log('Сага вызвана, goalId:', goalId);
    console.log('Генерация AI плана для цели:', goalId);
    
    const response: GeneratePlanResponse = yield call(() => aiApi.generatePlan(goalId));
     console.log('Ответ от сервера:', response.data);
    
    console.log('Ответ AI:', response.data);
    
    if (response.data.status === 'ready' && response.data.data?.tasks) {
      // готовый план задач
      yield put(generatePlanSuccess(response.data.data.tasks));
    } else if (response.data.status === 'clarification_needed' && response.data.questions && response.data.session_id) {
      // нужны уточнения
      yield put(generatePlanClarification({
        sessionId: response.data.session_id,
        questions: response.data.questions,
      }));
    } else {
      // неизвестный ответ
      yield put(generatePlanFailure(response.data.error || 'Неизвестная ошибка'));
    }
  } catch (error: any) {
    console.log('Ошибка генерации плана:', error);
    console.log('Ошибка в саге:', error?.message, error?.response?.data);
    
    // обработка ошибок по статусам
    if (error.response?.status === 404) {
      yield put(generatePlanFailure('Цель не найдена'));
    } else if (error.response?.status === 502) {
      yield put(generatePlanFailure('Ошибка генерации плана. Попробуйте позже'));
    } else if (error.response?.status === 504) {
      yield put(generatePlanFailure('Превышено время ожидания. Попробуйте позже'));
    } else if (error.response?.status === 400) {
      yield put(generatePlanFailure('Сессия уточнений истекла. Сгенерируйте план заново'));
    } else {
      yield put(generatePlanFailure(error.message || 'Ошибка сети'));
    }
  }
}

function* handleClarifyPlan(action: PayloadAction<{ goalId: number; sessionId: string; answers: { question_id: string; answer: string }[] }>): Generator<any, void, ClarifyPlanResponse> {
  try {
    const { goalId, sessionId, answers } = action.payload;
    console.log('Отправка уточнений:', { goalId, sessionId, answers });
    
    const response: ClarifyPlanResponse = yield call(() => aiApi.clarifyPlan({
      goal_id: goalId,
      session_id: sessionId,
      answers,
    }));
    
    console.log('Ответ на уточнения:', response.data);
    
    if (response.data.status === 'ready' && response.data.data?.tasks) {
      yield put(clarifyPlanSuccess(response.data.data.tasks));
    } else {
      yield put(clarifyPlanFailure('Не удалось получить план'));
    }
  } catch (error: any) {
    console.log('Ошибка отправки уточнений:', error);
    
    if (error.response?.status === 400) {
      yield put(clarifyPlanFailure('Сессия уточнений истекла. Сгенерируйте план заново'));
    } else {
      yield put(clarifyPlanFailure(error.message || 'Ошибка сети'));
    }
  }
}

export function* aiSaga() {
  yield takeLatest(generatePlanRequest.type, handleGeneratePlan);
  yield takeLatest(clarifyPlanRequest.type, handleClarifyPlan);
}