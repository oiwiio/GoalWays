import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
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
import { tasksApi } from '../../shared/api/tasks';

function* handleFetchTasks(api: any, action: PayloadAction<number>): any {
  try {
    const response = yield call(() => tasksApi.getTasks(action.payload));
    if (response.data.status === 'success') {
      yield put(fetchTasksSuccess(response.data.data.content));
    } else {
      yield put(fetchTasksFailure(response.data.error || 'Ошибка загрузки задач'));
    }
  } catch (error: any) {
    yield put(fetchTasksFailure(error.message || 'Ошибка сети'));
  }
}

function* handleCreateTask(api: any, action: PayloadAction<{ goalId: number; data: any }>): any {
  try {
    const response = yield call(() => tasksApi.createTask(action.payload.goalId, action.payload.data));
    if (response.data.status === 'success') {
      yield put(createTaskSuccess(response.data.data));
    } else {
      yield put(createTaskFailure(response.data.error || 'Ошибка создания задачи'));
    }
  } catch (error: any) {
    yield put(createTaskFailure(error.message || 'Ошибка сети'));
  }
}

function* handleUpdateTask(api: any, action: PayloadAction<{ goalId: number; taskId: number; data: any }>): any {
  try {
    const response = yield call(() => tasksApi.updateTask(action.payload.goalId, action.payload.taskId, action.payload.data));
    if (response.data.status === 'success') {
      yield put(updateTaskSuccess(response.data.data));
    } else {
      yield put(updateTaskFailure(response.data.error || 'Ошибка обновления задачи'));
    }
  } catch (error: any) {
    yield put(updateTaskFailure(error.message || 'Ошибка сети'));
  }
}

function* handleDeleteTask(api: any, action: PayloadAction<{ goalId: number; taskId: number }>): any {
  try {
    const response = yield call(() => tasksApi.deleteTask(action.payload.goalId, action.payload.taskId));
    if (response.data.status === 'success') {
      yield put(deleteTaskSuccess(action.payload.taskId));
    } else {
      yield put(deleteTaskFailure(response.data.error || 'Ошибка удаления задачи'));
    }
  } catch (error: any) {
    yield put(deleteTaskFailure(error.message || 'Ошибка сети'));
  }
}

export function* tasksSaga(api: any) {
  yield takeLatest(fetchTasksRequest.type, handleFetchTasks, api);
  yield takeLatest(createTaskRequest.type, handleCreateTask, api);
  yield takeLatest(updateTaskRequest.type, handleUpdateTask, api);
  yield takeLatest(deleteTaskRequest.type, handleDeleteTask, api);
}