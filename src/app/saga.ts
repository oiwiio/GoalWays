import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/auth-saga';
import { registerSaga } from '../features/register/register.saga';
import { forgotPasswordSaga } from '../features/forgot-password/forgot-password.saga';
import { settingsSaga } from '../features/settings/settings.saga';
import { goalsSaga } from '../features/goals/goals.saga';
import { confirmSaga } from '../features/confirm/saga';


export function* rootSaga() {
  yield all([
    authSaga(),
    registerSaga(),
    forgotPasswordSaga(),
    settingsSaga(),
    goalsSaga(),
    confirmSaga(),
  ]);
}