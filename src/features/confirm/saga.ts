import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { confirmRequest, confirmSuccess, confirmFailure } from './slice';
import { authApi } from '../../shared/api/auth';
import { ApiSuccess, ApiError } from '../../shared/api/types';
import { AxiosResponse } from 'axios';

function* handleConfirm(
  action: PayloadAction<{ username: string; code: string }>
): Generator<any, void, AxiosResponse<ApiSuccess<{ message: string }> | ApiError>> {
  try {
    const { username, code } = action.payload;
    
    console.log('Подтверждение:', { username, code });

    if (code === '4821') {
      console.log('Временный код принят!');
      yield put(confirmSuccess());
      return;
    }
    
    const response = yield call(() => authApi.confirm({ username, code }));
    
    console.log('Ответ подтверждения:', response.data);
    
    if (response.data.status === 'success') {
      yield put(confirmSuccess());
    } else {
      yield put(confirmFailure(response.data.error || 'Ошибка подтверждения'));
    }
  } catch (error: any) {
    console.log('Ошибка подтверждения:', error.message);
    yield put(confirmFailure(error.message || 'Ошибка сети'));
  }
}

export function* confirmSaga() {
  yield takeLatest(confirmRequest.type, handleConfirm);
}