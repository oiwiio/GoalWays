import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../types/goal';
import {
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
} from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { goalsApi } from '../../shared/api/goals';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../shared/api/types';

// тип для ответа с пагинацией (как в документации)
interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

type GoalsResponse = AxiosResponse<ApiResponse<PageResponse<Goal>>>;
type SingleGoalResponse = AxiosResponse<ApiResponse<Goal>>;

function* handleFetchGoals(): any{
  try {
    const token = yield call([AsyncStorage, 'getItem'], 'access_token');
    console.log('Токен перед запросом целей:', token);
    
    const response = (yield call(goalsApi.fetchGoals, { page: 0, size: 10 })) as GoalsResponse;
    
     console.log('Полный ответ сервера (цели):', JSON.stringify(response.data, null, 2));

    if (response.data.status === 'success') {
      yield put(fetchGoalsSuccess(response.data.data.content));
    } else {
      yield put(fetchGoalsFailure(response.data.error || 'Ошибка загрузки целей'));
    }
  } catch (error: any) {
    console.log('Ошибка загрузки целей:', error.message);
    yield put(fetchGoalsFailure(error.message || 'Ошибка сети'));
  }
}

function* handleCreateGoal(action: PayloadAction<any>) {
  try {
    console.log('Получены данные для создания цели:', JSON.stringify(action.payload, null, 2));
    
    let backendPriority = 'MEDIUM';
    switch (action.payload.priority) {
      case 'high':
        backendPriority = 'HIGH';
        break;
      case 'medium':
        backendPriority = 'MEDIUM';
        break;
      case 'low':
        backendPriority = 'LOW';
        break;
    }

    const payload = {
      title: action.payload.title,
      description: action.payload.description || '',
      priority: backendPriority,
      start_date: action.payload.startdate || new Date().toISOString().split('T')[0],
      deadline: action.payload.deadline || null,
      daily_time_minutes: action.payload.daily_time_minutes || 60,
      stages: action.payload.stages || [
        {
          title: 'Базовая задача',
          priority: 'MEDIUM',
          estimatedMinutes: 60,
          startsAt: new Date().toISOString().split('T')[0]
        }
      ]
    };

    console.log('Отправляем на сервер:', JSON.stringify(payload, null, 2));
    
    const response = (yield call(goalsApi.createGoal, payload)) as SingleGoalResponse;
    
    console.log('Ответ сервера:', response.data);
    
    if (response.data.status === 'success') {
    console.log('Цель создана:', response.data.data);
    yield put(createGoalSuccess(response.data.data));
    yield put(fetchGoalsRequest()); 
  }   else {
       console.log('Ошибка от сервера:', response.data.error);
       yield put(createGoalFailure(response.data.error || 'Ошибка создания цели'));
}
  } catch (error: any) {
    console.log('Критическая ошибка:', error.message);
    console.log('Полный объект ошибки:', error);
    yield put(createGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleUpdateGoal(action: PayloadAction<Goal>) {
  try {
    const updateData = {
      title: action.payload.title,
      description: action.payload.description,
      priority: action.payload.priority,
      start_date: action.payload.startdate,
      deadline: action.payload.deadline,
      daily_time_minutes: action.payload.daily_time_minutes,
      stages: action.payload.stages
    };
    
    const response = (yield call(
      goalsApi.updateGoal,
      Number(action.payload.id),
      updateData
    )) as SingleGoalResponse;
    
    if (response.data.status === 'success') {
      yield put(updateGoalSuccess(response.data.data));
    } else {
      yield put(updateGoalFailure(response.data.error || 'Ошибка обновления цели'));
    }
  } catch (error: any) {
    yield put(updateGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleArchiveGoal(action: PayloadAction<string>) {
  try {
    const response = (yield call(
      goalsApi.updateGoal,
      Number(action.payload),
      { status: 'ARCHIVED' }
    )) as SingleGoalResponse;
    
    if (response.data.status === 'success') {
      yield put(archiveGoalSuccess(action.payload));
    } else {
      yield put(archiveGoalFailure(response.data.error || 'Ошибка архивирования'));
    }
  } catch (error: any) {
    yield put(archiveGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleRestoreGoal(action: PayloadAction<string>) {
  try {
    const response = (yield call(
      goalsApi.updateGoal,
      Number(action.payload),
      { status: 'IN_PROGRESS' }
    )) as SingleGoalResponse;
    
    if (response.data.status === 'success') {
      yield put(restoreGoalSuccess(action.payload));
    } else {
      yield put(restoreGoalFailure(response.data.error || 'Ошибка восстановления'));
    }
  } catch (error: any) {
    yield put(restoreGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleDeleteGoal(action: PayloadAction<string>) {
  try {
    const response = (yield call(goalsApi.deleteGoal, Number(action.payload))) as AxiosResponse<ApiResponse<{ message: string }>>;
    
    if (response.data.status === 'success') {
      yield put(deleteGoalSuccess(action.payload));
    } else {
      yield put(deleteGoalFailure(response.data.error || 'Ошибка удаления'));
    }
  } catch (error: any) {
    yield put(deleteGoalFailure(error.message || 'Ошибка сети'));
  }
}

export function* goalsSaga() {
  yield takeLatest(fetchGoalsRequest.type, handleFetchGoals);
  yield takeLatest(createGoalRequest.type, handleCreateGoal);
  yield takeLatest(updateGoalRequest.type, handleUpdateGoal);
  yield takeLatest(archiveGoalRequest.type, handleArchiveGoal);
  yield takeLatest(restoreGoalRequest.type, handleRestoreGoal);
  yield takeLatest(deleteGoalRequest.type, handleDeleteGoal);
}