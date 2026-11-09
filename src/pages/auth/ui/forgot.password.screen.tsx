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
import { resetPasswordRequest, clearStatus } from '../../../features/forgot-password/slice';
import {
  selectForgotPasswordIsLoading,
  selectForgotPasswordError,
  selectForgotPasswordSuccess,
} from '../../../features/forgot-password/selectors';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { Logo } from '../../../shared/ui/logo';
import { ui } from '../../../shared/styles/ui';

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
      Alert.alert(
        'Письмо отправлено',
        `На ${email} отправлена инструкция по восстановлению пароля.`
      );
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
          <Text style={styles.title}>Восстановление пароля</Text>
          <Text style={styles.subtitle}>Введите email, указанный при регистрации</Text>
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
            title="Отправить инструкцию"
            onPress={handleResetPassword}
            loading={isLoading}
            style={styles.resetButton}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.backContainer}
          >
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
  resetButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  backIcon: {
    fontSize: 16,
    color: ui.text,
    marginRight: 6,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
    color: ui.text,
  },
});