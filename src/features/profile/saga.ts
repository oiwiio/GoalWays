import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} from './slice';
import { 
  AuthApi, 
  ApiSuccess, 
  ApiError, 
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest 
} from '../../shared/api/types';
import { AxiosResponse } from 'axios';

type ProfileApiResponse = AxiosResponse<ApiSuccess<UserProfile> | ApiError>;
type UpdateProfileApiResponse = AxiosResponse<ApiSuccess<UserProfile> | ApiError>;
type ChangePasswordApiResponse = AxiosResponse<ApiSuccess<{ message: string }> | ApiError>;

// cага загрузки профиля
function* handleFetchProfile(
  api: { authApi: AuthApi }
): Generator<any, void, ProfileApiResponse> {
  try {
    console.log('Загрузка профиля...');
    
    const response: ProfileApiResponse = yield call(() => api.authApi.getProfile());
    
    console.log('Ответ загрузки профиля:', response.data);
    
    if (response.data.status === 'success') {
      yield put(fetchProfileSuccess(response.data.data));
    } else {
      yield put(fetchProfileFailure(response.data.error || 'Ошибка загрузки профиля'));
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка сети';
    console.log('Ошибка загрузки профиля:', errorMessage);
    yield put(fetchProfileFailure(errorMessage));
  }
}

// cага обновления профиля
function* handleUpdateProfile(
  api: { authApi: AuthApi },
  action: PayloadAction<UpdateProfileRequest>
): Generator<any, void, UpdateProfileApiResponse> {
  try {
    console.log('Обновление профиля:', action.payload);
    
    const response: UpdateProfileApiResponse = yield call(() => 
      api.authApi.updateProfile(action.payload)
    );
    
    console.log('Ответ обновления профиля:', response.data);
    
    if (response.data.status === 'success') {
      yield put(updateProfileSuccess(response.data.data));
    } else {
      yield put(updateProfileFailure(response.data.error || 'Ошибка обновления профиля'));
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка сети';
    console.log('Ошибка обновления профиля:', errorMessage);
    yield put(updateProfileFailure(errorMessage));
  }
}

// cага смены пароля
function* handleChangePassword(
  api: { authApi: AuthApi },
  action: PayloadAction<ChangePasswordRequest>
): Generator<any, void, ChangePasswordApiResponse> {
  try {
    console.log('Смена пароля');
    
    const response: ChangePasswordApiResponse = yield call(() => 
      api.authApi.changePassword(action.payload)
    );
    
    console.log('Ответ смены пароля:', response.data);
    
    if (response.data.status === 'success') {
      yield put(changePasswordSuccess());
    } else {
      yield put(changePasswordFailure(response.data.error || 'Ошибка смены пароля'));
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка сети';
    console.log('Ошибка смены пароля:', errorMessage);
    yield put(changePasswordFailure(errorMessage));
  }
}

export function* profileSaga(api: { authApi: AuthApi }) {
  yield takeLatest(fetchProfileRequest.type, handleFetchProfile, api);
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile, api);
  yield takeLatest(changePasswordRequest.type, handleChangePassword, api);
}