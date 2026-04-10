import React, { useState } from "react";
import { View, Text, ScrollView, Switch, Alert, Linking, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { SettingsSection, SettingsItem } from '../../../features/settings';
import { 
  setNotifications, 
  logoutRequest 
} from '../../../features/settings/slice';
import { 
  selectNotifications,
  selectSettingsError 
} from '../../../features/settings/selectors';
import { ChangeEmailModal } from '../../../features/settings/ui/change.email.modal';
import { ChangePasswordModal } from '../../../features/settings/ui/change.password.modal';
import { ChangeNicknameModal } from '../../../features/settings/ui/change.nickname.modal';
import { DeleteAccountModal } from '../../../features/settings/ui/delete.account.modal';



type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useDispatch();
  
  const notifications = useSelector(selectNotifications);
  const error = useSelector(selectSettingsError);

  // Состояния для модалок
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Временные данные пользователя (потом из Redux)
  const userData = {
    email: 'pochta@gmail.com',
    nickname: 'Петька Иванов',
  };

  const handleChangeEmail = (newEmail: string) => {
    // TODO: dispatch смены email
    Alert.alert('Успех', 'Email изменён');
    setEmailModalVisible(false);
  };

  const handleChangePassword = (oldPassword: string, newPassword: string) => {
    // TODO: dispatch смены пароля
    Alert.alert('Успех', 'Пароль изменён');
    setPasswordModalVisible(false);
  };

  const handleChangeNickname = (newNickname: string) => {
    // TODO: dispatch смены никнейма
    Alert.alert('Успех', 'Никнейм изменён');
    setNicknameModalVisible(false);
  };

  const handleDeleteAccount = () => {
    // TODO: dispatch удаления аккаунта
    Alert.alert('Аккаунт удалён', 'Все данные стёрты');
    setDeleteModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <>
      <ScrollView>
        {/* данные аккаунта */}
        <SettingsSection title="Данные аккаунта">
          <SettingsItem
            title="Email"
            subtitle={userData.email}
            onPress={() => setEmailModalVisible(true)}
            showChevron
          />
          <SettingsItem
            title="Никнейм"
            subtitle={userData.nickname}
            onPress={() => setNicknameModalVisible(true)}
            showChevron
          />
          <SettingsItem
            title="Пароль"
            subtitle="••••••••"
            onPress={() => setPasswordModalVisible(true)}
            showChevron
          />
        </SettingsSection>

        {/* уведомления */}
        <SettingsSection title="Уведомления">
          <SettingsItem
            title="Push-уведомления"
            rightElement={
              <Switch 
                value={notifications} 
                onValueChange={(value) => { dispatch(setNotifications(value))}}
              />
            }
          />
        </SettingsSection>

        {/* поддержка */}
        <SettingsSection title="Поддержка">
          <SettingsItem
            title="Обратиться в поддержку"
            onPress={() => Linking.openURL('mailto:support@goalways.com')}
            showChevron
          />
        </SettingsSection>

        {/* о приложении */}
        <SettingsSection title="О приложении">
          <SettingsItem
            title="Разработчики"
            onPress={() => navigation.navigate('Developers')}
            showChevron
          />
          <SettingsItem
            title="Версия"
            subtitle="v1.0.1"
            showChevron={false}
          />
        </SettingsSection>

        {/* опасная зона */}
        <SettingsSection title="Опасная зона">
          <SettingsItem
            title="Удалить аккаунт"
            onPress={() => setDeleteModalVisible(true)}
            color="red"
            showChevron
          />
          <SettingsItem
            title="Выйти"
            onPress={() => {
              Alert.alert('Выход', 'Вы уверены?', [
                { text: 'Отмена', style: 'cancel' },
                { text: 'Выйти', onPress: () => dispatch(logoutRequest()) }
              ]);
            }}
            color="red"
          />
        </SettingsSection>
      </ScrollView>

      {/* модалка смены email */}
      <Modal visible={emailModalVisible} transparent animationType="slide">
        <ChangeEmailModal
          visible={emailModalVisible}  
          onClose={() => setEmailModalVisible(false)}
          onSave={handleChangeEmail}
          currentEmail={userData.email}
        />
      </Modal>

      {/* модалка смены пароля */}
      <Modal visible={passwordModalVisible} transparent animationType="slide">
        <ChangePasswordModal
          visible={passwordModalVisible}
          onClose={() => setPasswordModalVisible(false)}
          onSave={handleChangePassword}
        />
      </Modal>

      {/* модалка смены никнейма */}
      <Modal visible={nicknameModalVisible} transparent animationType="slide">
        <ChangeNicknameModal
          visible={nicknameModalVisible} 
            onClose={() => setNicknameModalVisible(false)}
            onSave={handleChangeNickname}
          currentNickname={userData.nickname}
        />
      </Modal>

      {/* модалка удаления аккаунта */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <DeleteAccountModal
          visible={deleteModalVisible} 
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteAccount}
        />
      </Modal>
    </>
  );
};