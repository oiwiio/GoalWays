import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { LoginScreen } from '../pages/auth/ui/LoginScreen';
import { RegisterScreen } from '../pages/auth/ui/RegisterScreen';
import { ForgotPasswordScreen } from '../pages/auth/ui/ForgotPasswordScreen'
import { MainScreen } from '../pages/main/ui/MainScreen'; 
import { SettingsScreen } from '../pages/settings/ui/SettingsScreen'; 
import { DevelopersScreen } from '../pages/developers/ui/DevelopersScreen'; 
import { GoalsScreen } from '../pages/goals/ui/GoalsScreen'; 

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
            headerShown: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};