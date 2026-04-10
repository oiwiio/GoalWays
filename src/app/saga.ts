import { fork, all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/saga';
import { registerSaga } from '../features/register/saga';
import { forgotPasswordSaga } from '../features/forgot-password/saga';
import { confirmSaga } from '../features/confirm/saga';
import { goalsSaga } from '../features/goals/saga';
import { settingsSaga } from '../features/settings/saga';

export function* rootSaga(api: any) {
  yield all([
    fork(authSaga, api),
    fork(registerSaga, api),
    fork(forgotPasswordSaga, api),
    fork(confirmSaga, api),
    fork(goalsSaga, api),
    fork(settingsSaga, api),
  ]);
}