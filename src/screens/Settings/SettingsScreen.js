import React, { useState } from "react";
import { View, Text, ScrollView, Switch } from 'react-native';
import SettingsSection from './SettingsSection';
import SettingsItem from './SettingsItem';


const SettingsScreen = () => {
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
      
      {/* для остальных секций */}
    </ScrollView>
    );
};

export default SettingsScreen;