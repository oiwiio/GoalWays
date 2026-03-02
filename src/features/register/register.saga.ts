import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit'; 
import { registerRequest, registerSuccess, registerFailure } from './register.slice';

// времянка  api
const fakeApi = {
  register: (email: string, password: string): Promise<{ id: string; email: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ id: '123', email });
        } else {
          reject(new Error('Ошибка регистрации'));
        }
      }, 1000);
    });
  },
};

function* handleRegister(action: PayloadAction<{ email: string; password: string }>) { 
  try {
    const { email, password } = action.payload;
    yield call(fakeApi.register, email, password);
    yield put(registerSuccess());
  } catch (error: any) {
    yield put(registerFailure(error.message || 'Ошибка регистрации'));
  }
}

export function* registerSaga() {
  yield takeLatest(registerRequest.type, handleRegister);
}