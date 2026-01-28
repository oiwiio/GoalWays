/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Counter from './components/Counter/Counter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';

// import MainScreen from './src/screens/Main/MainScreen'; // добавиmь позже

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
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'Регистрация' }}
        />
          <Stack.Screen 
          name="Counter" 
          component={Counter}
          options={{ title: 'Счётчик' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
