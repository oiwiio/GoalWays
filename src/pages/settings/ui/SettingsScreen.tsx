import React, { useState } from "react";
import { View, Text, ScrollView, Switch, Alert, Linking } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { SettingsSection } from '../SettingsSection';
import { SettingsItem } from '../SettingsItem';


type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', onPress: () => console.log('Logout pressed') }
      ]
    );
  };

  return (
    <ScrollView>
      <SettingsSection title="Уведомления">
        <SettingsItem
          title="Push-уведомления"
          rightElement={
            <Switch value={notifications} onValueChange={setNotifications} />
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

