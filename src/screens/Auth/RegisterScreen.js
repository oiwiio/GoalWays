import React, { useState } from "react"; // убрал лишний "use"
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from './styles';

const RegisterScreen = ({ navigation }) => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 

    const handleRegister = () => { 
        if (!email || !password || !confirmPassword) {
            Alert.alert('Ошибка', 'Заполните все поля');
            return;
        }
        
        if (password !== confirmPassword) {
            Alert.alert('Ошибка', 'Пароли не совпадают');
            return;
        }

        Alert.alert('Успех', `Аккаунт ${email} создан!`);
        navigation.navigate('Counter'); // или navigation.navigate('Login')
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
            
            <Button title="Зарегистрироваться" onPress={handleRegister} />
            
            <Text 
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
            >
                Уже есть аккаунт? Войти
            </Text>
        </View>
    );
};

export default RegisterScreen; 