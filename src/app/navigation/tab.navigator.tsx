import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GoalsScreen } from '../../pages/goals/ui/goals.screen';
import { ProfileScreen } from '../../pages/profile/ui/profile.screen';
import { colors, typography, spacing } from '../../shared/styles/theme';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: spacing.xs,
          paddingTop: spacing.xs,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          ...typography.caption,
          fontSize: 12,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Goals" 
        component={GoalsScreen} 
        options={{
          title: 'Цели',
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: size, color }}>
              {focused ? '🎯' : '🎯'}
            </Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Профиль',
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ fontSize: size, color }}>
              {focused ? '👤' : '👤'}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};