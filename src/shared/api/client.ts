import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = axios.create({
    baseURL: 'http://10.3.25.112:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    console.log('Токен в запросе к', config.url, ':', token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

