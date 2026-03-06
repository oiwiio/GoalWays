import { call, put, takeLatest } from 'redux-saga/effects';
import { logoutRequest, logoutSuccess, logoutFailure } from './settings.slice';  

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
    yield put(logoutSuccess());  
    // сюда можно впихнуть навигацию на экран входа 
  } catch (error: any) {
    yield put(logoutFailure(error.message || 'Ошибка при выходе'));
  }
}


export function* settingsSaga() {
  yield takeLatest(logoutRequest.type, handleLogout);
}