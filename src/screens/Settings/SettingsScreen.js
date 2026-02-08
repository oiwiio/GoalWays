import React, { useState } from "react";
import { View, Text, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsSection from './SettingsSection';
import SettingsItem from './SettingsItem';



const SettingsScreen = () => {
  const navigation = useNavigation();
    const [notifications, setNotifications] = useState(true);

    const handleLogout = () => {
        console.log('Logout pressed');

    };
    return(
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
          onPress={() => navigation.navigate('ChangePassword')}
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

export default SettingsScreen;