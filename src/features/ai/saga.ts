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
import { 
  AIPlanResponse, 
  AIClarifyRequest, 
  AIClarifyResponse,
  AIPlanData 
} from '../../shared/api/types';
import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';

type GeneratePlanResponse = AxiosResponse<AIPlanResponse>;
type ClarifyPlanResponse = AxiosResponse<AIClarifyResponse>;

function* handleGeneratePlan(action: PayloadAction<{ goalId: number; prompt: string }>) {
  try {
    const { goalId, prompt } = action.payload;
    console.log('Сага вызвана, goalId:', goalId, 'prompt:', prompt);
    
    const response: GeneratePlanResponse = yield call(() => 
      aiApi.generatePlan({ goalId, prompt })
    );
    
    console.log('Ответ сервера:', response.data);
    
    // Получаем данные из ответа
    const responseData = response.data as any;
    
    // Успешный ответ от бэкенда
    if (responseData.status === 'success' && responseData.data?.stages) {
      const stages = responseData.data.stages;
      console.log('Получены этапы:', stages.length);
      
      // Преобразуем в формат для модалки
      const tasks = stages.map((stage: any) => ({
        title: stage.title,
        description: stage.description || '',
        priority: stage.priority || 'MEDIUM',
        estimated_minutes: stage.estimatedMinutes || 60,
        selected: true,
      }));
      
      yield put(generatePlanSuccess(tasks));
    } 
    // Если нужны уточнения
    else if (responseData.status === 'clarification_needed' && responseData.questions) {
      console.log('Нужны уточнения:', responseData.questions);
      yield put(generatePlanClarification({
        sessionId: responseData.session_id || Date.now().toString(),
        questions: responseData.questions,
      }));
    }
    // Ошибка от бэкенда
    else {
      console.log('Неожиданный ответ:', responseData);
      yield put(generatePlanFailure(responseData.error || 'Не удалось сгенерировать план'));
    }
    
  } catch (error: any) {
    console.log('Ошибка в саге:', error?.message);
    
    // Простая обработка ошибок
    let errorMessage = 'Ошибка генерации плана';
    
    if (error?.response?.status === 403) {
      errorMessage = 'Нет доступа к AI функциям';
    } else if (error?.response?.status === 400) {
      errorMessage = error?.response?.data?.error?.message || 'Некорректный запрос';
    } else if (error?.response?.status === 500) {
      errorMessage = 'Ошибка на сервере. Попробуйте позже';
    }
    
    yield put(generatePlanFailure(errorMessage));
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
    
    if (response.data.status === 'success' && response.data.data?.tasks) {
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