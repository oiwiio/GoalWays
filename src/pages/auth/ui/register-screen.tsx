import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { registerRequest, clearStatus } from '../../../features/register/register.slice';
import { 
  selectRegisterIsLoading, 
  selectRegisterError, 
  selectRegisterSuccess 
} from '../../../features/register/register.selectors';
import styles from '../styles';

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
    // 🔒 Строгая валидация - раскомментируй когда будет готов бэкенд
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
    
    // ✅ Простая валидация для тестов
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
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        onBlur={() => validateEmail(email)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Пароль"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validatePassword(text);
          if (confirmPassword) validateConfirmPassword(confirmPassword);
        }}
        onBlur={() => validatePassword(password)}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TextInput
        style={[styles.input, confirmPasswordError ? styles.inputError : null]}
        placeholder="Повторите пароль"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          validateConfirmPassword(text);
        }}
        onBlur={() => validateConfirmPassword(confirmPassword)}
        secureTextEntry
      />
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      <Button
        title={isLoading ? "Регистрация..." : "Зарегистрироваться"}
        onPress={handleRegister}
        disabled={isLoading}
      />

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Уже есть аккаунт? Войти
      </Text>
    </View>
  );
};