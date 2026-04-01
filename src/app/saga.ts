// app/rootSaga.ts
import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth';
import { registerSaga } from '../features/register';
import { goalsSaga } from '../features/goals';
import { settingsSaga } from '../features/settings';

export function* rootSaga() {
  yield all([
    authSaga(),
    registerSaga(),
    goalsSaga(),
    settingsSaga(),
  ]);
}