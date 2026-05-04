// features/profile/ui/ProfileScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { fetchProfileRequest, clearError } from '../../../features/profile/slice';
import { selectProfile, selectProfileLoading, selectProfileError } from '../../../features/profile/selectors';
import { profileStyles } from './profile.styles';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch();
  
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  // Загружаем профиль при открытии экрана
  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  // Показываем ошибку, если она есть
  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Функция для форматирования даты регистрации
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  if (isLoading && !profile) {
    return (
      <SafeAreaView style={profileStyles.container}>
        <View style={profileStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={profileStyles.loadingText}>Загрузка профиля...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      {/* заголовок */}
      <View style={profileStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={profileStyles.backButton}>←</Text>
        </TouchableOpacity>
    
        <Text style={profileStyles.title}>Вы</Text>
    
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={profileStyles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* аватарка и данные */}
      <View style={profileStyles.profileHeader}>
        <View style={profileStyles.avatarContainer}>
          <Text style={profileStyles.avatarText}>
            {profile?.avatar ? '🖼️' : '👤'}
          </Text>
        </View>
        <View style={profileStyles.userInfo}>
          <Text style={profileStyles.userName}>{profile?.username || 'Пользователь'}</Text>
          <Text style={profileStyles.userEmail}>{profile?.email || ''}</Text>
          {profile?.firstName && (
            <Text style={profileStyles.userFullName}>
              {profile.firstName} {profile.lastName}
            </Text>
          )}
          <Text style={profileStyles.userId}>ID: {profile?.id || '—'}</Text>
          {profile?.createdAt && (
            <Text style={profileStyles.userDate}>
              С нами с {formatDate(profile.createdAt)}
            </Text>
          )}
        </View>
      </View>

      {/* меню */}
      <View style={profileStyles.menuContainer}>
        <MenuItem 
          title="Мой аккаунт" 
          onPress={() => navigation.navigate('Settings')} 
        />
        <MenuItem 
          title="Редактировать профиль" 
          onPress={() => {
            // TODO: открыть модалку редактирования профиля
            Alert.alert('В разработке', 'Редактирование профиля скоро появится');
          }} 
        />
      </View>
    </SafeAreaView>
  );
};

// компонент пункта меню
const MenuItem = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={profileStyles.menuItem} onPress={onPress}>
    <Text style={profileStyles.menuItemText}>{title}</Text>
    <Text style={profileStyles.menuItemArrow}>›</Text>
  </TouchableOpacity>
);