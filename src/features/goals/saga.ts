import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { GoalAPI } from '../../types/goal';
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

const normalizeGoal = (goal: any): GoalAPI => ({
  ...goal,
  priority: goal.priority?.toLowerCase(),
  status: goal.status?.toLowerCase(),
  startdate: goal.start_date,

});

function* handleFetchGoals(api: any): any {
  try {
    const response = yield call(() => api.goalsApi.fetchGoals({ page: 0, size: 10 }));
    console.log('FETCHED GOALS:', response.data.data.content);
    
    if (response.data.status === 'success') {
      const normalizedGoals = response.data.data.content.map(normalizeGoal);
      yield put(fetchGoalsSuccess(normalizedGoals));
    } else {
      yield put(fetchGoalsFailure(response.data.error || 'Ошибка загрузки целей'));
    }
  } catch (error: any) {
    console.log('Ошибка загрузки целей:', error.message);
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

const mapCategoryToBackend = (cat: string) => {
  switch (cat) {
    case 'Работа': return 'WORK';
    case 'Учеба': return 'STUDY';
    case 'Здоровье': return 'HEALTH';
    default: return 'OTHER';
  }
};

function* handleUpdateGoal(api: any, action: PayloadAction<GoalAPI>): any {
  console.log('Сага получила:', JSON.stringify(action.payload, null, 2));
  try {
    const updateData: any = {
      title: action.payload.title,
      description: action.payload.description,
      priority: action.payload.priority?.toUpperCase(),
      progress: action.payload.progress,
      status: action.payload.status?.toUpperCase(),
    };

    // добавляем только если есть
    if (action.payload.startdate) {
      updateData.start_date = action.payload.startdate;
    }

    if (action.payload.deadline) {
      updateData.deadline = action.payload.deadline;
    }

    if (action.payload.category) {
      updateData.category = action.payload.category;
    }

    if (action.payload.daily_time_minutes) {
      updateData.daily_time_minutes = action.payload.daily_time_minutes;
    }
    
    console.log('FINAL UPDATE DATA:', JSON.stringify(updateData, null, 2));
    console.log('Обновление цели (ID:', Number(action.payload.id), '):', JSON.stringify(updateData, null, 2));
    
    
    const response = yield call(() => api.goalsApi.updateGoal(Number(action.payload.id), updateData));
    console.log('RESPONSE FROM BACKEND:', JSON.stringify(response.data, null, 2));
    
    if (response.data.status === 'success') {
      const normalized = normalizeGoal(response.data.data);

      yield put(updateGoalSuccess(normalized));
      yield put(fetchGoalsRequest());
    } else {
      yield put(updateGoalFailure(response.data.error || 'Ошибка обновления цели'));
    }
  } catch (error: any) {
    console.log('фуллэррор:', error.response?.data);
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