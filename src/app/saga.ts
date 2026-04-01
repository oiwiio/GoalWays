import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth';
import { registerSaga } from '../features/register';
import { forgotPasswordSaga } from '../features/forgot-password';
import { confirmSaga } from '../features/confirm';
import { goalsSaga } from '../features/goals';
import { settingsSaga } from '../features/settings';

export function* rootSaga() {
  yield all([
    authSaga(),
    registerSaga(),
    forgotPasswordSaga(),
    confirmSaga(),
    goalsSaga(),
    settingsSaga(),
  ]);
}