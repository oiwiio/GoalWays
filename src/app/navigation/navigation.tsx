import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../../pages/auth';
import { SettingsScreen } from '../../pages/settings';
import { DevelopersScreen } from '../../pages/developers';
import { GoalsScreen } from '../../pages/goals';
import { ConfirmScreen } from '../../pages/confirm/ui/confirm.screen';
import { ProfileScreen } from '../../pages/profile/ui/profile.screen';
import { GoalDetailScreen } from '../../features/goals/ui/goal-detail/goal-detail-screen';
import { GoalAPI } from '../../types/goal';
import { TabNavigator } from './tab.navigator';
import { colors } from '../../shared/styles/theme';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Confirm: { username: string };
  MainTabs: undefined;  // 👈 изменил название
  Settings: undefined;
  Developers: undefined;
  GoalDetail: {
    goalId: string;
    goal: GoalAPI;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Auth screens */}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} options={{ headerShown: false }} />
      
      {/* Main app with tabs */}
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      
      {/* Modal screens */}
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Developers" component={DevelopersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};