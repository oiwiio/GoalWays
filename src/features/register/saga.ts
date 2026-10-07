import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { registerRequest, registerSuccess, registerFailure } from './slice';
import { AuthApi, ApiSuccess, ApiError, RegisterRequest } from '../../shared/api/types';
import { AxiosResponse } from 'axios';

type RegisterApiResponse = AxiosResponse<ApiSuccess<{ message: string }> | ApiError>;

function* handleRegister(
  api: { authApi: AuthApi }, 
  action: PayloadAction<RegisterRequest> 
): Generator<any, void, RegisterApiResponse> {
  try {
    const { username, email, password } = action.payload;
    
    console.log('Регистрация:', { username, email });
    
    const response: RegisterApiResponse = yield call(() => 
      api.authApi.register({ username, email, password })
    );
    
    console.log('Ответ регистрации:', response.data);
    
    if (response.data.status === 'success') {
      yield put(registerSuccess());
    } else {
      yield put(registerFailure(response.data.error || 'Ошибка регистрации'));
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка сети';
    console.log('Ошибка регистрации:', errorMessage);
    yield put(registerFailure(errorMessage));
  }
}

export function* registerSaga(api: { authApi: AuthApi }) {
  yield takeLatest(registerRequest.type, handleRegister, api);
}