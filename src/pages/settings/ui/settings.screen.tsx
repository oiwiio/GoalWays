// features/settings/ui/SettingsScreen.tsx
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  Switch, 
  Alert, 
  Linking, 
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { SettingsSection, SettingsItem } from '../../../features/settings';
import { 
  setNotifications, 
  logoutRequest 
} from '../../../features/settings/slice';
import { 
  selectNotifications,
  selectSettingsError 
} from '../../../features/settings/selectors';
import { selectProfile } from '../../../features/profile/selectors';
import { fetchProfileRequest } from '../../../features/profile/slice';
import { ChangeEmailModal } from '../../../features/settings/ui/change.email.modal';
import { ChangePasswordModal } from '../../../features/settings/ui/change.password.modal';
import { ChangeNicknameModal } from '../../../features/settings/ui/change.nickname.modal';
import { DeleteAccountModal } from '../../../features/settings/ui/delete.account.modal';
import { colors, spacing, typography, borderRadius } from '../../../shared/styles/theme';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useDispatch();
  
  const notifications = useSelector(selectNotifications);
  const error = useSelector(selectSettingsError);
  const profile = useSelector(selectProfile);
  
  // Состояния для модалок
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Загружаем профиль при открытии
  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  // Реальные данные из профиля
  const userData = {
    email: profile?.email || 'не указан',
    nickname: profile?.username || 'Пользователь',
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
  };

  const handleChangeEmail = (newEmail: string) => {
    // TODO: dispatch смены email
    Alert.alert('Успех', `Email изменён на ${newEmail}`);
    setEmailModalVisible(false);
    // Обновляем профиль
    dispatch(fetchProfileRequest());
  };

  const handleChangePassword = (oldPassword: string, newPassword: string) => {
    // TODO: dispatch смены пароля
    Alert.alert('Успех', 'Пароль изменён');
    setPasswordModalVisible(false);
  };

  const handleChangeNickname = (newNickname: string) => {
    // TODO: dispatch смены никнейма
    Alert.alert('Успех', `Никнейм изменён на ${newNickname}`);
    setNicknameModalVisible(false);
    // Обновляем профиль
    dispatch(fetchProfileRequest());
  };

  const handleDeleteAccount = () => {
    // TODO: dispatch удаления аккаунта
    Alert.alert('Аккаунт удалён', 'Все данные стёрты');
    setDeleteModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Настройки</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* данные аккаунта */}
        <SettingsSection title="Данные аккаунта">
          <SettingsItem
            title="Email"
            subtitle={userData.email}
            onPress={() => setEmailModalVisible(true)}
            showChevron
          />
          <SettingsItem
            title="Имя пользователя"
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
                onValueChange={(value) => {
                  dispatch(setNotifications(value));
                }}
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
            color={colors.danger}
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
            color={colors.danger}
          />
        </SettingsSection>
      </ScrollView>

      {/* модалки */}
      <ChangeEmailModal
        visible={emailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        onSave={handleChangeEmail}
        currentEmail={userData.email}
      />

      <ChangePasswordModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onSave={handleChangePassword}
      />

      <ChangeNicknameModal
        visible={nicknameModalVisible}
        onClose={() => setNicknameModalVisible(false)}
        onSave={handleChangeNickname}
        currentNickname={userData.nickname}
      />

      <DeleteAccountModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteAccount}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    paddingTop: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
});