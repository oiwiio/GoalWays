import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

type DevelopersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Developers'>;

type TeamMember = {
  role: string;
  name: string;
  description: string;
  contact: string;
  contactUrl?: string;
};

export const DevelopersScreen = () => {
  const navigation = useNavigation<DevelopersScreenNavigationProp>();
  
  const team: TeamMember[] = [ 
    {
      role: 'Дизайнер',
      name: 'Щиголев Иосиф',
      description: 'UI/UX, мокапы, пользовательские сценарии',
      contact: '@Iosik123',
      contactUrl: 'https://t.me/Iosik123', 
    },
    {
      role: 'Фронтенд-разработчик',
      name: 'Колеватов Георгий',
      description: 'React Native, архитектура, навигация',
      contact: '@oiwiio',
      contactUrl: 'https://t.me/oiwiio',
    },
    {
      role: 'Бэкенд-разработчик',
      name: 'Абичкин Никита',
      description: 'Node.js / Python',
      contact: '@RUSSIAN_BERSERK',
      contactUrl: 'https://t.me/RUSSIAN_BERSERK',
    },
    {
      role: 'Проджект Менеджер',
      name: 'Веревкина Дарья',
      description: 'Управление проектом',
      contact: '@Bbi_ji',
      contactUrl: 'https://t.me/Bbi_ji', 
    },
  ];

  const handleContactPress = (url: string) => { 
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Команда GoalWays</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>
          Приложение разрабатывается студентами для учебного проекта.
          Каждый вносит свой вклад в общее дело.
        </Text>

        {team.map((member, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.role}>{member.role}</Text>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.description}>{member.description}</Text>
            
            <View style={styles.contactContainer}>
              <Text style={styles.contactLabel}>Контакт:</Text>
              {member.contactUrl ? (
                <TouchableOpacity onPress={() => handleContactPress(member.contactUrl!)}>
                  <Text style={styles.contactLink}>{member.contact}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.contactText}>{member.contact}</Text>
              )}
            </View>
          </View>
        ))}

        <Text style={styles.footer}>© 2025 GoalWays. Учебный проект.</Text>
      </ScrollView>
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
    fontSize: 24,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xxl,
  },
  subtitle: {
    ...typography.bodySecondary,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.l,
    marginBottom: spacing.m,
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
  role: {
    ...typography.caption,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  name: {
    ...typography.h3,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.s,
  },
  description: {
    ...typography.bodySecondary,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.m,
    lineHeight: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.s,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  contactLabel: {
    ...typography.caption,
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  contactLink: {
    ...typography.body,
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  contactText: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.l,
  },
});