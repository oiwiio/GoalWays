import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { GoalAPI } from '../../types/goal';
import { select } from 'redux-saga/effects';
import { RootState } from '../../app/store'
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
import { SagaIterator } from 'redux-saga';

type Api = {
  goalsApi: {
    fetchGoals: (params: { page: number; size: number }) => Promise<{
      data: {
        status: string;
        data: { content: GoalAPI[] };
        error?: string;
      };
    }>;
    createGoal: (data: unknown) => Promise<{
      data: {
        status: string;
        data: GoalAPI;
        error?: string;
      };
    }>;
    updateGoal: (id: number, data: unknown) => Promise<{
      data: {
        status: string;
        data: GoalAPI;
        error?: string;
      };
    }>;
    deleteGoal: (id: number) => Promise<{
      data: {
        status: string;
        error?: string;
      };
    }>;
  };
};

const normalizeGoal = (goal: any): GoalAPI => ({
  ...goal,
  priority: goal.priority?.toLowerCase(),
  status: goal.status?.toLowerCase(),
  startdate: goal.start_date,

});

function* handleFetchGoals(api: Api): SagaIterator {
  try {
    console.log('handleFetchGoals вызвана');
    
    const filters: { status: string[]; sort: string; order: string } = yield select(
      (state: RootState) => 
        state.ui.goalFilters
      
    );
    
    console.log('Фильтры перед запросом:', JSON.stringify(filters, null, 2));
    console.log('  - status:', filters.status);
    console.log('  - sort:', filters.sort);
    console.log('  - order:', filters.order);

    const params: any = {
      page: 0,
      size: 10,
      sort: filters.sort || 'createdAt',
      order: filters.order || 'desc',
    };

    if (filters.status && filters.status.length > 0) {
      params.status = filters.status.join(',');
      console.log('  - status param:', params.status);
    }

    console.log('Параметры запроса:', JSON.stringify(params, null, 2));

    const response = yield call(() => api.goalsApi.fetchGoals(params));
    
    console.log('Ответ на fetchGoals:', {
      status: response.data.status,
      dataLength: response.data.data?.content?.length,
      fullData: response.data
    });

    if (response.data.status === 'success') {
      const normalized = response.data.data.content.map(normalizeGoal);
      console.log('Цели загружены:', {
        count: normalized.length,
        firstGoal: normalized[0]?.title
      });
      yield put(fetchGoalsSuccess(normalized));
    } else {
      console.log('Ошибка от сервера:', response.data.error);
      yield put(fetchGoalsFailure(response.data.error || 'Ошибка загрузки'));
    }
  } catch (error: unknown) {
    console.log('Ошибка в handleFetchGoals:', error);
    if (error instanceof Error) {
      console.log('  - message:', error.message);
      console.log('  - stack:', error.stack);
      yield put(fetchGoalsFailure(error.message));
    } else {
      console.log('  - неизвестная ошибка');
      yield put(fetchGoalsFailure('Ошибка сети'));
    }
  }
}
function* handleCreateGoal(api: Api, action: PayloadAction<GoalAPI>): SagaIterator {
  try {
    const payload = {
    title: action.payload.title,
    description: action.payload.description || '',
    priority: action.payload.priority?.toUpperCase() || 'MEDIUM',
    start_date: action.payload.startdate || new Date().toISOString().split('T')[0],
    deadline: action.payload.deadline || null,
    daily_time_minutes: action.payload.daily_time_minutes || 60,
    // stages: action.payload.stages || [   
    //     {
    //         title: 'Базовая задача',
    //         priority: 'MEDIUM',
    //         estimatedMinutes: 60,
    //         deadline: new Date().toISOString().split('T')[0],
    //         startsAt: new Date().toISOString().split('T')[0],
    //         sortOrder: 0,
    //     }
    // ],
};

    const response = yield call(() => api.goalsApi.createGoal(payload)); 

    if (response.data.status === 'success') {
      yield put(createGoalSuccess(response.data.data));
      yield put(fetchGoalsRequest());
    } else {
      yield put(createGoalFailure(response.data.error || 'Ошибка создания'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(createGoalFailure(error.message));
    } else {
      yield put(createGoalFailure('Ошибка сети'));
    }
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

function* handleUpdateGoal(
  api: Api,
  action: PayloadAction<GoalAPI>
): SagaIterator {
  try { 
    const payload = {
      title: action.payload.title,
      description: action.payload.description,
      priority: action.payload.priority?.toUpperCase(),
      start_date: action.payload.startdate,  
      deadline: action.payload.deadline,
      daily_time_minutes: action.payload.daily_time_minutes,
      category: action.payload.category,
      progress: action.payload.progress,
      status: action.payload.status?.toUpperCase(),
    };
    const response = yield call(() =>
      api.goalsApi.updateGoal(Number(action.payload.id), action.payload)
    );

    if (response.data.status === 'success') {
      yield put(updateGoalSuccess(response.data.data));
      yield put(fetchGoalsRequest());
    } else {
      yield put(updateGoalFailure(response.data.error || 'Ошибка обновления'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(updateGoalFailure(error.message));
    } else {
      yield put(updateGoalFailure('Ошибка сети'));
    }
  }
}

function* handleArchiveGoal(api: Api, action: PayloadAction<string>): SagaIterator {
    console.log('2 Сага архивации получила ID:', action.payload);
    try {
        const response = yield call(() => api.goalsApi.updateGoal(Number(action.payload), { status: 'ARCHIVED' }));
        console.log('3 Ответ от сервера:', response.data);
        console.log(' :) Статус после архивации:', response.data.data.status);
        if (response.data.status === 'success') {
            console.log('4 Успех, диспатчим archiveGoalSuccess');
            yield put(archiveGoalSuccess(action.payload));
            yield put(fetchGoalsRequest());
        } else {
            console.log('5 Ошибка от сервера:', response.data.error);
            yield put(archiveGoalFailure(response.data.error || 'Ошибка архивирования'));
        }
    } catch (error: any) {
        console.log('6 Исключение в саге:', error.message);
        yield put(archiveGoalFailure(error.message || 'Ошибка сети'));
    };
};

function* handleRestoreGoal(api: Api, action: PayloadAction<string>): SagaIterator {
  try {
    const response = yield call(() => api.goalsApi.updateGoal(Number(action.payload), { status: 'IN_PROGRESS' }));
    
    if (response.data.status === 'success') {
      yield put(restoreGoalSuccess(action.payload));
      yield put(fetchGoalsRequest());
    } else {
      yield put(restoreGoalFailure(response.data.error || 'Ошибка восстановления'));
    }
  } catch (error: any) {
    yield put(restoreGoalFailure(error.message || 'Ошибка сети'));
  }
}

function* handleDeleteGoal(
  api: Api,
  action: PayloadAction<string>
): SagaIterator {
  try {
    const response = yield call(() =>
      api.goalsApi.deleteGoal(Number(action.payload))
    );

    if (response.data.status === 'success') {
      yield put(deleteGoalSuccess(action.payload));
    } else {
      yield put(deleteGoalFailure(response.data.error || 'Ошибка удаления'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(deleteGoalFailure(error.message));
    } else {
      yield put(deleteGoalFailure('Ошибка сети'));
    }
  }
} 



export function* goalsSaga(api: Api): SagaIterator {
  yield takeLatest(fetchGoalsRequest.type, handleFetchGoals, api);
  yield takeLatest(createGoalRequest.type, handleCreateGoal, api);
  yield takeLatest(updateGoalRequest.type, handleUpdateGoal, api);
  yield takeLatest(archiveGoalRequest.type, handleArchiveGoal, api);  
  yield takeLatest(restoreGoalRequest.type, handleRestoreGoal, api);  
  yield takeLatest(deleteGoalRequest.type, handleDeleteGoal, api);
}