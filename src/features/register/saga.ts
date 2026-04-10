import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { registerRequest, registerSuccess, registerFailure } from './slice';

function* handleRegister(api: any, action: PayloadAction<{ username: string; email: string; password: string }>): any {
  try {
    const { username, email, password } = action.payload;
    
    console.log('Регистрация:', { username, email });
    
    const response = yield call(() => api.authApi.register({ username, email, password }));
    
    console.log('Ответ регистрации:', response.data);
    
    if (response.data.status === 'success') {
      yield put(registerSuccess());
    } else {
      yield put(registerFailure(response.data.error || 'Ошибка регистрации'));
    }
  } catch (error: any) {
    console.log('Ошибка регистрации:', error.message);
    yield put(registerFailure(error.message || 'Ошибка сети'));
  }
}

export function* registerSaga(api: any) {
  yield takeLatest(registerRequest.type, handleRegister, api);
}