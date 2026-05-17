// features/profile/ui/ProfileScreen.tsx
import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator, 
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { fetchProfileRequest, clearError } from '../../../features/profile/slice';
import { selectProfile, selectProfileLoading, selectProfileError } from '../../../features/profile/selectors';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

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
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Загрузка профиля...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* заголовок */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Профиль</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* аватарка и данные */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {profile?.avatar ? '🖼️' : '👤'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profile?.username || 'Пользователь'}</Text>
            <Text style={styles.userEmail}>{profile?.email || ''}</Text>
            {profile?.firstName && (
              <Text style={styles.userFullName}>
                {profile.firstName} {profile.lastName}
              </Text>
            )}
            <View style={styles.idContainer}>
              <Text style={styles.userId}>ID: {profile?.id || '—'}</Text>
            </View>
            {profile?.createdAt && (
              <Text style={styles.userDate}>
                С нами с {formatDate(profile.createdAt)}
              </Text>
            )}
          </View>
        </View>

        {/* меню */}
        <View style={styles.menuContainer}>
          <MenuItem 
            title="Мой аккаунт" 
            onPress={() => navigation.navigate('Settings')} 
          />
          <MenuItem 
            title="Редактировать профиль" 
            onPress={() => {
              Alert.alert('В разработке', 'Редактирование профиля скоро появится');
            }} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// компонент пункта меню
const MenuItem = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.menuItemText}>{title}</Text>
    <Text style={styles.menuItemArrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.m,
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 22,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.m,
    marginVertical: spacing.m,
    borderRadius: borderRadius.l,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  avatarText: {
    fontSize: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h3,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.bodySecondary,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  userFullName: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  idContainer: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.s,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  userId: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  userDate: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  menuContainer: {
    marginTop: spacing.s,
    marginHorizontal: spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.m,
    marginBottom: spacing.s,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  menuItemText: {
    ...typography.body,
    color: colors.text,
  },
  menuItemArrow: {
    fontSize: 20,
    color: colors.textSecondary,
  },
});