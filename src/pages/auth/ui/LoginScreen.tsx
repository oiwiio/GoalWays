import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation'; 
import styles from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Ошибка', 'Заполните все поля');
            return;
        }

        Alert.alert('Успех', `Привет, ${email}! (логика позже)`);
        navigation.navigate('Main');
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
            
            <Button title="Войти" onPress={handleLogin} />
            
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

