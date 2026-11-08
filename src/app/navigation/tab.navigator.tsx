import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Target, User } from 'lucide-react-native';
import { GoalsScreen } from '../../pages/goals/ui/goals.screen';
import { ProfileScreen } from '../../pages/profile/ui/profile.screen';

const Tab = createBottomTabNavigator();

const ui = {
  tabBar: '#222226',
  active: '#FFFFFF',
  inactive: '#6E6E75',
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: ui.tabBar,
          borderTopWidth: 0,
          elevation: 0,
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: ui.active,
        tabBarInactiveTintColor: ui.inactive,
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          title: 'Цели',
          tabBarIcon: ({ color }) => <Target color={color} size={24} strokeWidth={1.75} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Вы',
          tabBarIcon: ({ color }) => <User color={color} size={24} strokeWidth={1.75} />,
        }}
      />
    </Tab.Navigator>
  );
};