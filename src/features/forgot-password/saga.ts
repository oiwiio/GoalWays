import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } from './slice';

function* handleResetPassword(api: any, action: PayloadAction<{ email: string }>): any {
  try {
    const { email } = action.payload;
    yield call(() => api.authApi.sendPasswordResetCode(email));
    yield put(resetPasswordSuccess());
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message || 'Ошибка при отправке'));
  }
}

export function* forgotPasswordSaga(api: any) {
  yield takeLatest(resetPasswordRequest.type, handleResetPassword, api);
}