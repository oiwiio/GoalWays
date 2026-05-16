// features/register/ui/RegisterScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { registerRequest, clearStatus } from '../../../features/register/slice';
import {
  selectRegisterIsLoading,
  selectRegisterError,
  selectRegisterSuccess
} from '../../../features/register/selectors';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { colors, spacing, typography, borderRadius } from '../../../shared/styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(selectRegisterIsLoading);
  const error = useSelector(selectRegisterError);
  const success = useSelector(selectRegisterSuccess);

  // валидация email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Неверный формат email');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Валидация пароля (12+ символов, цифры, спецсимволы) - ЗАКОММЕНТИРОВАНО
  const validatePassword = (password: string) => {
    // Строгая валидация 
    /*
    if (password.length < 12) {
      setPasswordError('Минимум 12 символов');
      return false;
    } else if (!/\d/.test(password)) {
      setPasswordError('Должна быть хотя бы одна цифра');
      return false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError('Должен быть хотя бы один спецсимвол (!@#$%^&*)');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
    */
    
    // Простая валидация для тестов
    if (password.length < 3) {
      setPasswordError('Минимум 3 символа');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validateConfirmPassword = (confirm: string) => {
    if (confirm !== password) {
      setConfirmPasswordError('Пароли не совпадают');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      dispatch(clearStatus());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      Alert.alert('Успех', 'Код подтверждения отправлен на email');
      dispatch(clearStatus());
      navigation.navigate('Confirm', { username });
    }
  }, [success, navigation, dispatch, username]);

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword);

    if (isEmailValid && isPasswordValid && isConfirmValid) {
      dispatch(registerRequest({ username, email, password }));
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Заголовок */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>📝</Text>
          </View>
          <Text style={styles.title}>Создать аккаунт</Text>
          <Text style={styles.subtitle}>
            Присоединяйся к GoalWays и достигай целей
          </Text>
        </View>

        {/* Форма регистрации */}
        <View style={styles.form}>
          <Input
            label="Имя пользователя"
            value={username}
            onChangeText={setUsername}
            placeholder="Введите username"
            autoCapitalize="none"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            onBlur={() => validateEmail(email)}
            placeholder="example@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />

          <Input
            label="Пароль"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
              if (confirmPassword) validateConfirmPassword(confirmPassword);
            }}
            onBlur={() => validatePassword(password)}
            placeholder="••••••••"
            secureTextEntry
            error={passwordError}
          />

          <Input
            label="Повторите пароль"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validateConfirmPassword(text);
            }}
            onBlur={() => validateConfirmPassword(confirmPassword)}
            placeholder="••••••••"
            secureTextEntry
            error={confirmPasswordError}
          />

          <Button
            title={isLoading ? "Регистрация..." : "Зарегистрироваться"}
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerButton}
          />

          <TouchableOpacity onPress={handleBackToLogin} style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Уже есть аккаунт?{' '}
              <Text style={styles.loginHighlight}>Войти</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.m,
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  loginContainer: {
    alignItems: 'center',
    paddingVertical: spacing.m,
  },
  loginText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginHighlight: {
    color: colors.primary,
    fontWeight: '600',
  },
});