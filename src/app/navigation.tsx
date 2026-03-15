import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../pages/auth';
import { MainScreen } from '../pages/main';
import { SettingsScreen } from '../pages/settings';
import { DevelopersScreen } from '../pages/developers';
import { GoalsScreen } from '../pages/goals';
import { ConfirmScreen } from '../pages/confirm/ui/confirm.screen';
import { ProfileScreen } from '../pages/profile/ui/profile.screen';


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Confirm: { username: string };
  Main: undefined;
  Settings: undefined;
  Developers: undefined; 
  Profile: undefined;
};

export type TabParamList = {
  Сообщение: undefined;  // пока заглушка
  Цели: undefined;
  Вы: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// заглушка для экрана "Сообщение"
const MessageScreen = () => <MainScreen />; // временно

// табы (после авторизации)
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Сообщение" component={MessageScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Цели" component={GoalsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Вы" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// корневой навигатор (до авторизации)
export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{  headerShown: false}}  />
      <Stack.Screen name="Register" component={RegisterScreen} options={{  headerShown: false}} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{  headerShown: false}} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Developers" component={DevelopersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}  />
    </Stack.Navigator>
  );
};