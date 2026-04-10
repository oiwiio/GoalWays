import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { confirmRequest, confirmSuccess, confirmFailure } from './slice';

function* handleConfirm(api: any, action: PayloadAction<{ username: string; code: string }>): any {
  try {
    const { username, code } = action.payload;
    
    console.log('Подтверждение:', { username, code });
    
    const response = yield call(() => api.authApi.confirm({ username, code }));
    
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

export function* confirmSaga(api: any) {
  yield takeLatest(confirmRequest.type, handleConfirm, api);
}