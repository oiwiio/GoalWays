import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } from './slice';
import { AuthApi, ApiSuccess, ApiError } from '../../shared/api/types';
import { AxiosResponse } from 'axios';

type ResetPasswordApiResponse = AxiosResponse<ApiSuccess<{ message: string }> | ApiError>;

interface ResetPasswordPayload {
  email: string;
}

function* handleResetPassword(
  api: { authApi: AuthApi }, 
  action: PayloadAction<ResetPasswordPayload>
): Generator<any, void, ResetPasswordApiResponse> {
  try {
    const { email } = action.payload;
    
    console.log('Запрос на сброс пароля для:', email);
    
    const response: ResetPasswordApiResponse = yield call(() => 
      api.authApi.sendPasswordResetCode(email)
    );
    
    console.log('Ответ сервера:', response.data);
    
    if (response.data.status === 'success') {
      yield put(resetPasswordSuccess());
    } else {
      yield put(resetPasswordFailure(response.data.error || 'Ошибка при отправке'));
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка сети';
    console.log('Ошибка сброса пароля:', errorMessage);
    yield put(resetPasswordFailure(errorMessage));
  }
}

export function* forgotPasswordSaga(api: { authApi: AuthApi }) {
  yield takeLatest(resetPasswordRequest.type, handleResetPassword, api);
}