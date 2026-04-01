import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit'; // 👈 добавить импорт
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } from './slice';

// Временное api
const fakeApi = {
 
  resetPassword: (email: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

// 👇 Типизируем action правильно
function* handleResetPassword(action: PayloadAction<{ email: string }>) {
  try {
    const { email } = action.payload;
    yield call(fakeApi.resetPassword, email);
    yield put(resetPasswordSuccess());
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message || 'Ошибка при отправке'));
  }
}

export function* forgotPasswordSaga() {
  yield takeLatest(resetPasswordRequest.type, handleResetPassword);
}