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
  archiveGoalRequest,
  archiveGoalSuccess,
  archiveGoalFailure,
} from './goals.slice';

// времянка api
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
            status: 'active',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Сдать курсовую',
            description: 'Закончить проект и подготовить отчет',
            category: 'Учеба',
            deadline: '2025-05-15',
            progress: 70,
            status: 'active',
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Пробежать марафон',
            description: 'Подготовка к забегу на 10 км',
            category: 'Здоровье',
            deadline: '2025-08-20',
            progress: 25,
            status: 'active',
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

  archiveGoal: (id: string): Promise<string> => {
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

function* handleArchiveGoal(action: PayloadAction<string>) {
  try {
    const id: string = yield call(fakeApi.archiveGoal, action.payload);
    yield put(archiveGoalSuccess(id));
  } catch (error: any) {
    yield put(archiveGoalFailure(error.message || 'Ошибка архивирования'));
  }
}

export function* goalsSaga() {
  yield takeLatest(fetchGoalsRequest.type, handleFetchGoals);
  yield takeLatest(createGoalRequest.type, handleCreateGoal);
  yield takeLatest(archiveGoalRequest.type, handleArchiveGoal);
}