/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { Settings, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Counter from './components/Counter/Counter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import DevelopersScreen from './src/screens/Settings/DevelopersScreen';
import GoalsScreen from './src/screens/tasks/GoalsScreen';
import MainScreen from './src/screens/main/MainScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth screens */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Вход' }}
        />

          <Stack.Screen 
            name="Main" 
            component={MainScreen}
            options={{ title: 'Главная' }}
          />

        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'Регистрация' }}
        />
        
          <Stack.Screen 
          name="Counter" 
          component={Counter}
          options={{ title: 'Счётчик' }}
        />
        
        <Stack.Screen 
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title:'Восстановление пароля'}}
        />

        <Stack.Screen 
        name="Settings"
        component={SettingsScreen}
        options={{title:'Настройки'}}
        />

        <Stack.Screen 
          name="Developers" 
          component={DevelopersScreen}
          options={{ title: 'Разработчики' }}
        />      

        <Stack.Screen 
          name="Goals" 
          component={GoalsScreen}
          options={{ 
          title: 'Мои цели',
          headerShown: true // Показываем заголовок
        }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
