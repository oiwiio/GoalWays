import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from './slice';
import { LoginResponse, ApiSuccess, ApiError } from '../../shared/api/types';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginPayload = {
  username: string;
  password: string;
};

function* handleLogin(
  api: any,
  action: PayloadAction<LoginPayload>
): Generator<any, void, AxiosResponse<ApiSuccess<LoginResponse> | ApiError>> {
  try {
    const { username, password } = action.payload;
    console.log('Получены данные:', { username, password });
    
    const response = yield call(() => api.authApi.login({ username, password }));
    console.log('Ответ сервера:', response.data);
    
    if (response.data.status === 'success') {
      const data = response.data.data;
      
      console.log('Успешный вход:', data);
      console.log('Сохраняем токен:', data.access_token);
      
      yield call([AsyncStorage, 'setItem'], 'access_token', data.access_token);
      yield call([AsyncStorage, 'setItem'], 'refreshToken', data.refreshToken);
      
      yield put(loginSuccess({ 
        user: { username }, 
        token: data.access_token 
      }));
    } else {
      console.log('Ошибка от сервера:', response.data.error);
      yield put(loginFailure(response.data.error || 'Ошибка входа'));
    }
  } catch (error: any) {
    console.log('Сетевая ошибка:', error.message);
    console.log('Полная ошибка:', error);
    yield put(loginFailure(error.message || 'Ошибка сети'));
  }
}

export function* authSaga(api: any) {
  yield takeLatest(loginRequest.type, handleLogin, api);
}