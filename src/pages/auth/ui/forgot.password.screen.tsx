import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { resetPasswordRequest, clearStatus } from '../../../features/forgot-password/slice';
import { selectForgotPasswordIsLoading, selectForgotPasswordError, selectForgotPasswordSuccess } from '../../../features/forgot-password/selectors';
import styles from '../styles';

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
    if (!email) {
      Alert.alert('Ошибка', 'Введите email');
      return;
    }
    dispatch(resetPasswordRequest({ email }));
  };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Восстановление пароля</Text>
            <Text style={styles.subtitle}>
                Введите email, указанный при регистрации
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <Button 
                title="Отправить инструкцию" 
                onPress={handleResetPassword} 
            />
            
            <Text 
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
            >
                ← Вернуться к входу
            </Text>
        </View>
    );
};

