import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { loginRequest } from '../../../features/auth/auth-slice';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAuthIsLoading, 
  selectAuthError, 
  selectAuthUser 
} from '../../../features/auth/auth.selectors';
import styles from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
    
    const [email, setEmail] = useState('');
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
            navigation.navigate('Main');
        }
    }, [user, navigation]);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Ошибка', 'Заполните все поля');
            return;
        }
        
        dispatch(loginRequest({ email, password }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>
            
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
            
            <Button 
                title={isLoading ? "Вход..." : "Войти"} 
                onPress={handleLogin}
                disabled={isLoading}
            />
            
            <Text 
                style={styles.link}
                onPress={() => navigation.navigate('Register')}
            >
                Нет аккаунта? Зарегистрироваться
            </Text>
            <Text 
                style={styles.link}
                onPress={() => navigation.navigate('ForgotPassword')}
            >
                Забыли пароль?
            </Text>
        </View>
    );
};