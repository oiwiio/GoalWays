import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { loginRequest } from '../../../features/auth/slice';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAuthIsLoading, 
  selectAuthError, 
  selectAuthUser 
} from '../../../features/auth/selectors';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { colors, spacing, typography, borderRadius } from '../../../shared/styles/theme';

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

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
        {/* Логотип / Заголовок */}
        <View style={styles.header}>
          <Text style={styles.logo}>🎯</Text>
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
          />

          <Input
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          <Button
            title={isLoading ? "Вход..." : "Войти"}
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          />

          <TouchableOpacity onPress={handleRegister} style={styles.linkContainer}>
            <Text style={styles.linkText}>
              Нет аккаунта?{' '}
              <Text style={styles.linkHighlight}>Зарегистрироваться</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Забыли пароль?</Text>
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
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.s,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySecondary,
    fontSize: 14,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  linkContainer: {
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  linkText: {
    ...typography.bodySecondary,
    fontSize: 14,
  },
  linkHighlight: {
    color: colors.primary,
    fontWeight: '600',
  },
  forgotContainer: {
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  forgotText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});