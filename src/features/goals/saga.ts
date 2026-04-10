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

function* handleFetchGoals(api: any): any {
  try {
    const response = yield call(() => api.goalsApi.fetchGoals({ page: 0, size: 10 }));
    
    if (response.data.status === 'success') {
      yield put(fetchGoalsSuccess(response.data.data.content));
    } else {
      yield put(fetchGoalsFailure(response.data.error || 'Ошибка загрузки целей'));
    }
  } catch (error: any) {
    console.log('❌ Ошибка загрузки целей:', error.message);
    yield put(fetchGoalsFailure(error.message || 'Ошибка сети'));
  }
}

function* handleCreateGoal(api: any, action: PayloadAction<any>): any {
  try {
    let backendPriority = 'MEDIUM';
    switch (action.payload.priority) {
      case 'high': backendPriority = 'HIGH'; break;
      case 'medium': backendPriority = 'MEDIUM'; break;
      case 'low': backendPriority = 'LOW'; break;
    }

    const payload = {
      title: action.payload.title,
      description: action.payload.description || '',
      priority: backendPriority,
      start_date: action.payload.startdate || new Date().toISOString().split('T')[0],
      deadline: action.payload.deadline || null,
      daily_time_minutes: action.payload.daily_time_minutes || 60,
      stages: action.payload.stages || [{
        title: 'Базовая задача',
        priority: 'MEDIUM',
        estimatedMinutes: 60,
        startsAt: new Date().toISOString().split('T')[0]
      }]
    };

    console.log('Отправляем на сервер:', JSON.stringify(payload, null, 2));
    
    const response = yield call(() => api.goalsApi.createGoal(payload));
    
    console.log('Ответ сервера:', response.data);
    
    if (response.data.status === 'success') {
      console.log('Цель создана:', response.data.data);
      yield put(createGoalSuccess(response.data.data));
      yield put(fetchGoalsRequest());
    } else {
      console.log('Ошибка от сервера:', response.data.error);
      yield put(createGoalFailure(response.data.error || 'Ошибка создания цели'));
    }
  } catch (error: any) {
    console.log('Критическая ошибка:', error.message);
    yield put(createGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleUpdateGoal(api: any, action: PayloadAction<Goal>): any {
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
    
    const response = yield call(() => api.goalsApi.updateGoal(Number(action.payload.id), updateData));
    
    if (response.data.status === 'success') {
      yield put(updateGoalSuccess(response.data.data));
    } else {
      yield put(updateGoalFailure(response.data.error || 'Ошибка обновления цели'));
    }
  } catch (error: any) {
    yield put(updateGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleArchiveGoal(api: any, action: PayloadAction<string>): any {
  try {
    const response = yield call(() => api.goalsApi.updateGoal(Number(action.payload), { status: 'ARCHIVED' }));
    
    if (response.data.status === 'success') {
      yield put(archiveGoalSuccess(action.payload));
    } else {
      yield put(archiveGoalFailure(response.data.error || 'Ошибка архивирования'));
    }
  } catch (error: any) {
    yield put(archiveGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleRestoreGoal(api: any, action: PayloadAction<string>): any {
  try {
    const response = yield call(() => api.goalsApi.updateGoal(Number(action.payload), { status: 'IN_PROGRESS' }));
    
    if (response.data.status === 'success') {
      yield put(restoreGoalSuccess(action.payload));
    } else {
      yield put(restoreGoalFailure(response.data.error || 'Ошибка восстановления'));
    }
  } catch (error: any) {
    yield put(restoreGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleDeleteGoal(api: any, action: PayloadAction<string>): any {
  try {
    const response = yield call(() => api.goalsApi.deleteGoal(Number(action.payload)));
    
    if (response.data.status === 'success') {
      yield put(deleteGoalSuccess(action.payload));
    } else {
      yield put(deleteGoalFailure(response.data.error || 'Ошибка удаления'));
    }
  } catch (error: any) {
    yield put(deleteGoalFailure(error.message || 'Ошибка сети'));
  }
}

export function* goalsSaga(api: any) {
  yield takeLatest(fetchGoalsRequest.type, handleFetchGoals, api);
  yield takeLatest(createGoalRequest.type, handleCreateGoal, api);
  yield takeLatest(updateGoalRequest.type, handleUpdateGoal, api);
  yield takeLatest(archiveGoalRequest.type, handleArchiveGoal, api);
  yield takeLatest(restoreGoalRequest.type, handleRestoreGoal, api);
  yield takeLatest(deleteGoalRequest.type, handleDeleteGoal, api);
}