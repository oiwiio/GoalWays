import React, { use, useState } from "react";
import { View, Text, TextInput,Button,Alert} from 'react-native';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('ошибка','заполнить все поля');
            return;
        }

        Alert.alert('Успех',`Привет, ${email}!, (логика позже)`);
             navigation.navigate('Counter');

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
    </View>
  );
};

export default LoginScreen;

