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
} from './goals.slice';


const fakeApi = {
  fetchGoals: (): Promise<Goal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Выучить React Native',
            description: 'Освоить основы и создать несколько проектов',
            category: 'Учеба',
            deadline: '2025-06-01',
            progress: 45,
            priority: 'high',
            status: 'in_progress',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Сдать курсовую',
            description: 'Закончить проект и подготовить отчет',
            category: 'Учеба',
            deadline: '2025-05-15',
            progress: 70,
            priority: 'medium',
            status: 'in_progress',
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Пробежать марафон',
            description: 'Подготовка к забегу на 10 км',
            category: 'Здоровье',
            deadline: '2025-08-20',
            progress: 25,
            priority: 'low',
            status: 'in_progress',
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 500);
    });
  },

  createGoal: (goal: Omit<Goal, 'id' | 'createdAt'>): Promise<Goal> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...goal,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        } as Goal);
      }, 500);
    });
  },

  updateGoal: (goal: Goal): Promise<Goal> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(goal);
      }, 500);
    });
  },

  archiveGoal: (id: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 300);
    });
  },

  restoreGoal: (id: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 300);
    });
  },

  deleteGoal: (id: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 300);
    });
  },
};

function* handleFetchGoals() {
  try {
    const goals: Goal[] = yield call(fakeApi.fetchGoals);
    yield put(fetchGoalsSuccess(goals));
  } catch (error: any) {
    yield put(fetchGoalsFailure(error.message || 'Ошибка загрузки целей'));
  }
}

function* handleCreateGoal(action: PayloadAction<Omit<Goal, 'id' | 'createdAt'>>) {
  try {
    const newGoal: Goal = yield call(fakeApi.createGoal, action.payload);
    yield put(createGoalSuccess(newGoal));
  } catch (error: any) {
    yield put(createGoalFailure(error.message || 'Ошибка создания цели'));
  }
}

function* handleUpdateGoal(action: PayloadAction<Goal>) {
  try {
    const updatedGoal: Goal = yield call(fakeApi.updateGoal, action.payload);
    yield put(updateGoalSuccess(updatedGoal));
  } catch (error: any) {
    yield put(updateGoalFailure(error.message || 'Ошибка обновления цели'));
  }
}

function* handleArchiveGoal(action: PayloadAction<string>) {
  try {
    const id: string = yield call(fakeApi.archiveGoal, action.payload);
    yield put(archiveGoalSuccess(id));
  } catch (error: any) {
    yield put(archiveGoalFailure(error.message || 'Ошибка архивирования'));
  }
}

function* handleRestoreGoal(action: PayloadAction<string>) {
  try {
    const id: string = yield call(fakeApi.restoreGoal, action.payload);
    yield put(restoreGoalSuccess(id));
  } catch (error: any) {
    yield put(restoreGoalFailure(error.message || 'Ошибка восстановления'));
  }
}

function* handleDeleteGoal(action: PayloadAction<string>) {
  try {
    const id: string = yield call(fakeApi.deleteGoal, action.payload);
    yield put(deleteGoalSuccess(id));
  } catch (error: any) {
    yield put(deleteGoalFailure(error.message || 'Ошибка удаления'));
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