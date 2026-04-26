import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';

import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from './tasks.slice';

import { Task } from '../../types/goal';
import { tasksApi } from '../../shared/api/tasks';


function* handleFetchTasks( action: PayloadAction<number>):SagaIterator {
  try {
    const response: {
      data: {
        status: string;
        data: { content: Task[] };
        error?: string;
      };
    } = yield call(() => tasksApi.getTasks(action.payload));

    if (response.data.status === 'success') {
      yield put(fetchTasksSuccess(response.data.data.content));
    } else {
      yield put(fetchTasksFailure(response.data.error || 'Ошибка загрузки задач'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchTasksFailure(error.message));
    } else {
      yield put(fetchTasksFailure('Ошибка сети'));
    }
  }
}

function* handleCreateTask(
  action: PayloadAction<{ goalId: number; data: Task }>
): SagaIterator {
  try {
    const response: {
      data: {
        status: string;
        data: Task;
        error?: string;
      };
    } = yield call(() =>
      tasksApi.createTask(action.payload.goalId, action.payload.data)
    );

    if (response.data.status === 'success') {
      yield put(createTaskSuccess(response.data.data));
    } else {
      yield put(createTaskFailure(response.data.error || 'Ошибка создания задачи'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(createTaskFailure(error.message));
    } else {
      yield put(createTaskFailure('Ошибка сети'));
    }
  }
}

function* handleUpdateTask(
  action: PayloadAction<{ goalId: number; taskId: number; data: Task }>
): SagaIterator {
  try {
    const response: {
      data: {
        status: string;
        data: Task;
        error?: string;
      };
    } = yield call(() =>
      tasksApi.updateTask(
        action.payload.goalId,
        action.payload.taskId,
        action.payload.data
      )
    );

    if (response.data.status === 'success') {
      yield put(updateTaskSuccess(response.data.data));
    } else {
      yield put(updateTaskFailure(response.data.error || 'Ошибка обновления задачи'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(updateTaskFailure(error.message));
    } else {
      yield put(updateTaskFailure('Ошибка сети'));
    }
  }
}

function* handleDeleteTask(
  action: PayloadAction<{ goalId: number; taskId: number }>
): SagaIterator {
  try {
    const response: {
      data: {
        status: string;
        error?: string;
      };
    } = yield call(() =>
      tasksApi.deleteTask(action.payload.goalId, action.payload.taskId)
    );

    if (response.data.status === 'success') {
      yield put(deleteTaskSuccess(action.payload.taskId));
    } else {
      yield put(deleteTaskFailure(response.data.error || 'Ошибка удаления задачи'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(deleteTaskFailure(error.message));
    } else {
      yield put(deleteTaskFailure('Ошибка сети'));
    }
  }
}


export function* tasksSaga(): SagaIterator {
  yield takeLatest(fetchTasksRequest.type, handleFetchTasks);
  yield takeLatest(createTaskRequest.type, handleCreateTask);
  yield takeLatest(updateTaskRequest.type, handleUpdateTask);
  yield takeLatest(deleteTaskRequest.type, handleDeleteTask);
}