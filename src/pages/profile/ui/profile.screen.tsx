import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { fetchProfileRequest, clearError } from '../../../features/profile/slice';
import { selectProfile, selectProfileLoading, selectProfileError } from '../../../features/profile/selectors';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;


const ui = {
  background: '#1B1B1D',
  text: '#FFFFFF',
  textMuted: '#A8A8AD',
  divider: '#FFFFFF',
  avatarBg: '#D9D9D9',
  accent: '#4F2BA8', 
};

const APP_VERSION = '1.0 release'; // TODO: брать из package.json / react-native-device-info

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const comingSoon = (title: string) => () =>
    Alert.alert('В разработке', `Раздел «${title}» скоро появится`);

  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') ||
    profile?.username ||
    'Пользователь';

  if (isLoading && !profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ui.text} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ui.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Шапка: ← Вы ✎ */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Вы</Text>
          <View style={styles.headerSpacer} />
          <TouchableOpacity
            onPress={comingSoon('Редактирование профиля')}
            style={styles.headerButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.editIcon}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* Аватар + имя + id */}
        <View style={styles.profileBlock}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar} />
            <TouchableOpacity
              style={styles.cameraBadge}
              onPress={comingSoon('Смена фото')}
              activeOpacity={0.8}
            >
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userId}>id {profile?.id ?? '—'}</Text>
        </View>

        {/* Меню */}
        <View style={styles.menu}>
          <MenuItem title="Мой аккаунт" onPress={() => navigation.navigate('Settings')} />
          <MenuItem title="Push уведомления" onPress={comingSoon('Push уведомления')} />
          <MenuItem
            title="Поддержка"
            onPress={() => Linking.openURL('mailto:support@goalways.com')}
          />
          <MenuItem title="Разработчики" onPress={() => navigation.navigate('Developers')} />

          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>Версия</Text>
            <Text style={styles.versionValue}>{APP_VERSION}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.6}>
    <Text style={styles.menuItemText}>{title}</Text>
    <View style={styles.chevron} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ui.background,
  },
  content: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Шапка
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    height: 80,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: ui.text,
  },
  editIcon: {
    fontSize: 24,
    color: ui.text,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: ui.text,
    marginLeft: 20,
  },
  headerSpacer: {
    flex: 1,
  },

  // Профиль
  profileBlock: {
    alignItems: 'center',
    marginTop: 24,
  },
  avatarWrapper: {
    width: 75,
    height: 75,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: ui.avatarBg,
  },
  cameraBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: ui.accent,
    borderWidth: 2,
    borderColor: ui.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 12,
  },
  userName: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '700',
    color: ui.text,
  },
  userId: {
    marginTop: 2,
    fontSize: 10,
    color: ui.text,
  },

  // Меню
  menu: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: ui.divider,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: ui.text,
  },
  // Шеврон ">" без иконочных библиотек: повёрнутый квадрат с двумя границами
  chevron: {
    width: 9,
    height: 9,
    marginRight: 3,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: ui.text,
    transform: [{ rotate: '45deg' }],
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: ui.text,
  },
  versionValue: {
    fontSize: 10,
    color: ui.textMuted,
  },
});