import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SESSION_ID = '11111111-1111-4111-8111-111111111111';

export const apiClient = axios.create({
    baseURL: 'http://185.246.223.132:8080',   
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    // 1. SessionId — на все запросы
    config.headers['SessionId'] = SESSION_ID;

    // 2. Access-токен — только если есть и это не auth-эндпоинт
    const isAuthEndpoint =
        config.url?.includes('/auth/login') ||
        config.url?.includes('/auth/register') ||
        config.url?.includes('/auth/confirm');

    const token = await AsyncStorage.getItem('access_token');
    console.log('Токен в запросе к', config.url, ':', token);

    if (token && !isAuthEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});