import React, { useEffect } from "react";
import { View, Text, ScrollView, Switch, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { SettingsSection, SettingsItem } from '../../../features/settings';
import { 
  setNotifications, 
  logoutRequest 
} from '../../../features/settings/settings.slice';
import { 
  selectNotifications,
  selectSettingsError 
} from '../../../features/settings/settings.selectors';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useDispatch();
  
  const notifications = useSelector(selectNotifications);
  const error = useSelector(selectSettingsError);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
    }
  }, [error]);

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Выйти', 
          onPress: () => dispatch(logoutRequest())
        }
      ]
    );
  };

  return (
    <ScrollView>
      <SettingsSection title="Уведомления">
        <SettingsItem
        title="Push-уведомления"
          rightElement={
            <Switch 
              value={notifications} 
              onValueChange={(value) => {
              dispatch(setNotifications(value));
            }} 
          />
        }
      />
      </SettingsSection>
      
      <SettingsSection title="Управление аккаунтом">
        <SettingsItem
          title="Сменить пароль"
          onPress={() => Alert.alert('В разработке', 'Функция появится позже')} // Временно
        />
        <SettingsItem
          title="Выйти"
          onPress={handleLogout}
          color="red"
        />
      </SettingsSection>
          
      <SettingsSection title="О приложении">
        <SettingsItem
          title="Обратная связь"
          onPress={() => Linking.openURL('mailto:support@goalways.com')}
        />
        <SettingsItem
          title="Разработчики"
          onPress={() => navigation.navigate('Developers')}
        />
        <SettingsItem
          title="Версия"
          rightElement={<Text style={{ color: '#666' }}>1.0.0 (beta)</Text>}
          onPress={() => Alert.alert('Версия', 'GoalWays 1.0.0\nСборка 42')}
        />
      </SettingsSection>
    </ScrollView>
  );
};

