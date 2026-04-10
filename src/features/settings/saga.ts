import { call, put, takeLatest } from 'redux-saga/effects';
import { logoutRequest, logoutSuccess, logoutFailure } from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* handleLogout(api: any): any {
  try {
    const refreshToken = yield call([AsyncStorage, 'getItem'], 'refreshToken');
    if (refreshToken) {
      yield call(() => api.authApi.logout({ refreshToken }));
    }
    yield call([AsyncStorage, 'removeItem'], 'access_token');
    yield call([AsyncStorage, 'removeItem'], 'refreshToken');
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(logoutFailure(error.message || 'Ошибка при выходе'));
  }
}

export function* settingsSaga(api: any) {
  yield takeLatest(logoutRequest.type, handleLogout, api);
}