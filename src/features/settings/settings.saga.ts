import { call, put, takeLatest } from 'redux-saga/effects';
import { Settings } from './';

// времянка для api
const fakeApi = {
  logout: (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },
};

function* handleLogout() {
  try {
    yield call(fakeApi.logout);
    yield put(Settings.actions.logoutSuccess());
    // сюда можно впихнуть навигацию на экран входа 
  } catch (error: any) {
    yield put(logoutFailure(error.message || 'Ошибка при выходе'));
  }
}

export function* init() {
  yield takeLatest(logoutRequest.type, handleLogout);
}