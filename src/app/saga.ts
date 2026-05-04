import { fork, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import type { Api } from '../shared/api/types';

import { authSaga as authFeatureSaga } from '../features/auth/saga';
import { registerSaga } from '../features/register/saga';
import { forgotPasswordSaga } from '../features/forgot-password/saga';
import { confirmSaga } from '../features/confirm/saga';
import { goalsSaga } from '../features/goals/saga';
import { settingsSaga } from '../features/settings/saga';
import { tasksSaga } from '../features/tasks/tasks.saga';
import { profileSaga } from '../features/profile/saga';

export function* rootSaga(api: any): SagaIterator {
  yield all([
    fork(authFeatureSaga, api),
    fork(registerSaga, api),
    fork(forgotPasswordSaga, api),
    fork(confirmSaga, api),
    fork(goalsSaga, api),
    fork(settingsSaga, api),
    fork(tasksSaga),
    fork(profileSaga, api),
  ]);
}

