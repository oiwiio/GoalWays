import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { registerRequest, clearStatus } from '../../../features/register/slice';
import {
  selectRegisterIsLoading,
  selectRegisterError,
  selectRegisterSuccess,
} from '../../../features/register/selectors';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { Logo } from '../../../shared/ui/logo';
import { ui } from '../../../shared/styles/ui';

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <StatusBar barStyle="light-content" backgroundColor={ui.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Заголовок */}
        <View style={styles.header}>
          <Logo size={56} />
          <Text style={styles.title}>Создать аккаунт</Text>
          <Text style={styles.subtitle}>Присоединяйся к GoalWays и достигай целей</Text>
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
            title="Зарегистрироваться"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerButton}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>
              Уже есть аккаунт? <Text style={styles.linkHighlight}>Войти</Text>
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
    backgroundColor: ui.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: ui.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: ui.textMuted,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  linkContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 12,
    color: ui.textMuted,
  },
  linkHighlight: {
    color: ui.text,
    fontWeight: '700',
  },
});