// features/forgot-password/ui/ForgotPasswordScreen.tsx
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
import { RootStackParamList } from '../../../app/navigation/navigation';
import { resetPasswordRequest, clearStatus } from '../../../features/forgot-password/slice';
import { 
  selectForgotPasswordIsLoading, 
  selectForgotPasswordError, 
  selectForgotPasswordSuccess 
} from '../../../features/forgot-password/selectors';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { colors, spacing, typography, borderRadius } from '../../../shared/styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  
  const isLoading = useSelector(selectForgotPasswordIsLoading);
  const error = useSelector(selectForgotPasswordError);
  const success = useSelector(selectForgotPasswordSuccess);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      dispatch(clearStatus());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      Alert.alert('Письмо отправлено', `На ${email} отправлена инструкция по восстановлению пароля.`);
      dispatch(clearStatus());
      navigation.navigate('Login');
    }
  }, [success, email, navigation, dispatch]);

  const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Введите email');
      return;
    }
    dispatch(resetPasswordRequest({ email: email.trim() }));
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
        {/* Иконка / Заголовок */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🔐</Text>
          </View>
          <Text style={styles.title}>Восстановление пароля</Text>
          <Text style={styles.subtitle}>
            Введите email, указанный при регистрации
          </Text>
        </View>

        {/* Форма */}
        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="example@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button
            title={isLoading ? "Отправка..." : "Отправить инструкцию"}
            onPress={handleResetPassword}
            loading={isLoading}
            style={styles.resetButton}
          />

          <TouchableOpacity onPress={handleBackToLogin} style={styles.backContainer}>
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Вернуться к входу</Text>
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
  resetButton: {
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.m,
  },
  backIcon: {
    fontSize: 18,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
});