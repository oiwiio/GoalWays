import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';

type DevelopersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Developers'>;

type TeamMember = {
  role: string;
  name: string;
  description: string;
  contact: string;
  contactUrl?: string;
};

const ui = {
  background: '#1B1B1D',
  card: '#2A2A30',
  text: '#FFFFFF',
  textMuted: '#A8A8AD',
};

const TEAM: TeamMember[] = [
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

export const DevelopersScreen = () => {
  const navigation = useNavigation<DevelopersScreenNavigationProp>();

  const handleContactPress = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ui.background} />

      {/* Шапка: ← Разработчики */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Разработчики</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          Приложение GoalWays разрабатывается студентами для учебного проекта. Каждый вносит свой
          вклад в общее дело.
        </Text>

        {TEAM.map((member) => (
          <View key={member.contact} style={styles.card}>
            <Text style={styles.role}>{member.role}</Text>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.description}>{member.description}</Text>

            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Контакт</Text>
              {member.contactUrl ? (
                <TouchableOpacity
                  onPress={() => handleContactPress(member.contactUrl)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
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

  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: ui.textMuted,
    marginBottom: 24,
  },

  // Карточка участника
  card: {
    backgroundColor: ui.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  role: {
    fontSize: 10,
    color: ui.textMuted,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: ui.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: ui.textMuted,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: ui.textMuted,
  },
  contactLabel: {
    fontSize: 10,
    color: ui.textMuted,
  },
  contactLink: {
    fontSize: 14,
    fontWeight: '600',
    color: ui.text,
    textDecorationLine: 'underline',
  },
  contactText: {
    fontSize: 14,
    color: ui.textMuted,
  },

  footer: {
    fontSize: 10,
    color: ui.textMuted,
    textAlign: 'center',
    marginTop: 24,
  },
});