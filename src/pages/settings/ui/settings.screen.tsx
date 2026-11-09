import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { selectProfile } from '../../../features/profile/selectors';
import { fetchProfileRequest } from '../../../features/profile/slice';
import { ChangeEmailModal } from '../../../features/settings/ui/change.email.modal';
import { ChangePasswordModal } from '../../../features/settings/ui/change.password.modal';
import { ChangeNicknameModal } from '../../../features/settings/ui/change.nickname.modal';
import { DeleteAccountModal } from '../../../features/settings/ui/delete.account.modal';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const ui = {
  background: '#1B1B1D',
  field: '#2A2A30',
  text: '#FFFFFF',
  textMuted: '#A8A8AD',
  danger: '#E83A3A',
};

export const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  const userData = {
    email: profile?.email || 'не указан',
    nickname: profile?.username || 'Пользователь',
  };

  const handleChangeEmail = (newEmail: string) => {
    // TODO: dispatch смены email
    Alert.alert('Успех', `Email изменён на ${newEmail}`);
    setEmailModalVisible(false);
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
      <StatusBar barStyle="light-content" backgroundColor={ui.background} />

      {/* Шапка: ← Аккаунт */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Аккаунт</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Field
          label="Ваше имя"
          value={userData.nickname}
          onEdit={() => setNicknameModalVisible(true)}
        />
        <Field
          label="Ваша почта"
          value={userData.email}
          onEdit={() => setEmailModalVisible(true)}
        />
        <Field
          label="Ваш пароль"
          value={'*'.repeat(18)}
          onEdit={() => setPasswordModalVisible(true)}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setDeleteModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteButtonText}>Удалить аккаунт</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Модалки */}
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

// Поле: подпись сверху, карточка со значением и карандашом справа
const Field = ({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) => (
  <View style={styles.fieldBlock}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TouchableOpacity style={styles.fieldCard} onPress={onEdit} activeOpacity={0.7}>
      <Text style={styles.fieldValue} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.editIcon}>✎</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ui.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  // Шапка
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    height: 80,
    marginBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: ui.text,
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
  },

  // Поля
  fieldBlock: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 10,
    color: ui.text,
    marginBottom: 8,
  },
  fieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: ui.field,
  },
  fieldValue: {
    flex: 1,
    marginRight: 12,
    fontSize: 14,
    fontWeight: '600',
    color: ui.text,
  },
  editIcon: {
    fontSize: 22,
    color: ui.text,
  },

  // Удаление
  deleteButton: {
    marginTop: 12,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: ui.danger,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: ui.text,
  },
});