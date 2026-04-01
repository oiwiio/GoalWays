import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { registerRequest, registerSuccess, registerFailure } from './slice';
import { authApi } from '../../shared/api/auth';
import { ApiSuccess, ApiError, RegisterResponse } from '../../shared/api/types'; 
import { AxiosResponse } from 'axios'; 

function* handleRegister(
  action: PayloadAction<{ username: string; email: string; password: string }>
) {
  try {
    const { username, email, password } = action.payload;
    
    console.log('Регистрация:', { username, email, password });
    
    const response: AxiosResponse<ApiSuccess<RegisterResponse> | ApiError> = yield call(
      () => authApi.register({ username, email, password })
    );
    
    console.log('Ответ регистрации:', response.data);
    
    if (response.data.status === 'success') {
      yield put(registerSuccess());
    } else {
      const errorData = response.data as ApiError;
      yield put(registerFailure(errorData.error || 'Ошибка регистрации'));
    }
  } catch (error: any) {
    console.log('Ошибка регистрации:', error.message);
    yield put(registerFailure(error.message || 'Ошибка сети'));
  }
}

export function* registerSaga() {
  yield takeLatest(registerRequest.type, handleRegister);
}