import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

// Типизируем ответ от API
interface ApiResponse {  
  user: { email: string; id: string };
  token: string;
}

// Временная заглушка API
const fakeApi = {
  login: (email: string, password: string): Promise<ApiResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { email, id: '123' },
          token: 'fake-jwt-token',
        });
      }, 1000);
    });
  },
};

function* handleLogin(action: PayloadAction<{ email: string; password: string }>): Generator<any, void, ApiResponse> {
  try {
    const { email, password } = action.payload;
    const response: ApiResponse = yield call(fakeApi.login, email, password);
    yield put(loginSuccess({ user: response.user, token: response.token }));  
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}