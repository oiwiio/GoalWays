import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { loginRequest } from '../../../features/auth/slice';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAuthIsLoading,
  selectAuthError,
  selectAuthUser,
} from '../../../features/auth/selectors';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { Logo } from '../../../shared/ui/logo';
import { ui } from '../../../shared/styles/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigation.navigate('MainTabs');
    }
  }, [user, navigation]);

  const handleLogin = () => {
    if (!username?.trim() || !password?.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    dispatch(loginRequest({ username: username.trim(), password: password.trim() }));
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
        {/* Логотип / заголовок */}
        <View style={styles.header}>
          <Logo size={72} />
          <Text style={styles.title}>GoalWays</Text>
          <Text style={styles.subtitle}>Твой путь к целям</Text>
        </View>

        {/* Форма входа */}
        <View style={styles.form}>
          <Input
            label="Имя пользователя"
            value={username}
            onChangeText={setUsername}
            placeholder="Введите username"
            autoCapitalize="none"
          />

          <Input
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          <Button
            title="Войти"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>
              Нет аккаунта? <Text style={styles.linkHighlight}>Зарегистрироваться</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>Забыли пароль?</Text>
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
    marginBottom: 40,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: ui.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: ui.textMuted,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  loginButton: {
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