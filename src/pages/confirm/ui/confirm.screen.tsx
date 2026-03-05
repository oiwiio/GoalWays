import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { confirmRequest, clearStatus } from '../../../features/confirm/slice';
import { 
  selectConfirmIsLoading, 
  selectConfirmError, 
  selectConfirmSuccess 
} from '../../../features/confirm/selectors';
import styles from '../styles'; 

type Props = NativeStackScreenProps<RootStackParamList, 'Confirm'>;  

export const ConfirmScreen = ({ navigation, route }: Props) => {
  const { username } = route.params as { username: string }; 
  const [code, setCode] = useState('');
  
  const dispatch = useDispatch();
  const isLoading = useSelector(selectConfirmIsLoading);
  const error = useSelector(selectConfirmError);
  const success = useSelector(selectConfirmSuccess);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      dispatch(clearStatus());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      Alert.alert('Успех', 'Аккаунт подтверждён!');
      dispatch(clearStatus());
      navigation.navigate('Login');
    }
  }, [success, navigation, dispatch]);

  const handleConfirm = () => {
    if (!code) {
      Alert.alert('Ошибка', 'Введите код подтверждения');
      return;
    }
    
    dispatch(confirmRequest({ username, code }));
  };

  const handleResendCode = () => {
    Alert.alert('Инфо', 'Функция повторной отправки кода будет добавлена');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Подтверждение email</Text>
      
      <Text style={styles.subtitle}>
        На адрес {username} отправлен код подтверждения
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Код из письма"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
      />
      
      <Button
        title={isLoading ? "Подтверждение..." : "Подтвердить"}
        onPress={handleConfirm}
        disabled={isLoading}
      />
      
      <Text 
        style={styles.link}
        onPress={handleResendCode}
      >
        Отправить код повторно
      </Text>
      
      <Text 
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        ← Вернуться к входу
      </Text>
    </View>
  );
};