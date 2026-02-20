import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import styles from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = ({ navigation }: any) => { 
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Ошибка', 'Введите email');
            return;
        }
        
        Alert.alert(
            'Письмо отправлено',
            `На ${email} отправлена инструкция по восстановлению пароля.`
        );
        
        navigation.navigate('Login');
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

