import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../pages/auth';
import { MainScreen } from '../pages/main';
import { SettingsScreen } from '../pages/settings';
import { DevelopersScreen } from '../pages/developers';
import { GoalsScreen } from '../pages/goals';
import { ConfirmScreen } from '../pages/confirm/ui/confirm.screen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Confirm: { username: string };
  ForgotPassword: undefined;
  Main: undefined;
  Settings: undefined;
  Developers: undefined;
  Goals: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Вход' }} />
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Главная' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Регистрация' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Восстановление пароля' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Настройки' }} />
      <Stack.Screen name="Developers" component={DevelopersScreen} options={{ title: 'Разработчики' }} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} options={{ title: 'Подтверждение' }}/>
      <Stack.Screen name="Goals" component={GoalsScreen} options={{ title: 'Мои цели', headerShown: true }} />
    </Stack.Navigator>
  );
};