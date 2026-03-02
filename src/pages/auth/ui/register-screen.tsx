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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(selectRegisterIsLoading);
  const error = useSelector(selectRegisterError);
  const success = useSelector(selectRegisterSuccess);

  // обработка ошибок 
  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      dispatch(clearStatus());
    }
  }, [error, dispatch]);

  // успех регистрации 
  useEffect(() => {
    if (success) {
      Alert.alert('Успех', `Аккаунт ${email} создан!`);
      dispatch(clearStatus());
      navigation.navigate('Main');
    }
  }, [success, email, navigation, dispatch]);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    dispatch(registerRequest({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Повторите пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

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