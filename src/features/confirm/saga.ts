import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { confirmRequest, confirmSuccess, confirmFailure } from './slice';
import { AuthApi, ApiSuccess, ApiError, ConfirmRequest } from '../../shared/api/types';
import { AxiosResponse } from 'axios';

type ConfirmApiResponse = AxiosResponse<ApiSuccess<{ message: string }> | ApiError>;

function* handleConfirm(
  api: { authApi: AuthApi }, 
  action: PayloadAction<ConfirmRequest> 
): Generator<any, void, ConfirmApiResponse> {
  try {
    const { username, code } = action.payload;
    
    console.log('Подтверждение:', { username, code });
    
    const response: ConfirmApiResponse = yield call(() => api.authApi.confirm({ username, code }));
    
    console.log('Ответ подтверждения:', response.data);
    
    if (response.data.status === 'success') {
      yield put(confirmSuccess());
    } else {
      yield put(confirmFailure(response.data.error || 'Ошибка подтверждения'));
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка сети';
    console.log('Ошибка подтверждения:', errorMessage);
    yield put(confirmFailure(errorMessage));
  }
}

export function* confirmSaga(api: { authApi: AuthApi }) {
  yield takeLatest(confirmRequest.type, handleConfirm, api);
}