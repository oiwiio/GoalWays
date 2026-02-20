// src/screens/Main/MainScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation'; // Импортируем типы

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>(); // Типизируем navigation

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GoalWays</Text>
        <Text style={styles.subtitle}>Твой путь к целям</Text>
      </View>

      <View style={styles.menuContainer}>
        {/* Кнопка целей - главная */}
        <TouchableOpacity 
          style={[styles.menuItem, styles.goalsItem]}
          onPress={() => navigation.navigate('Goals')}
        >
          <Text style={styles.menuIcon}>🎯</Text>
          <Text style={styles.menuTitle}>Мои цели</Text>
          <Text style={styles.menuDescription}>Управляй своими целями</Text>
        </TouchableOpacity>

        {/* Другие пункты меню */}
       
        <TouchableOpacity 
          style={[styles.menuItem, styles.settingsItem]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuTitle}>Настройки</Text>
          <Text style={styles.menuDescription}>Настрой приложение</Text>
        </TouchableOpacity>
      </View>

      {/* Информация о пользователе (временная) */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Не авторизован</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Войти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    padding: 20,
    gap: 15,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalsItem: {
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
  },
  counterItem: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF9500',
  },
  settingsItem: {
    borderLeftWidth: 5,
    borderLeftColor: '#8E8E93',
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: '#999',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  footerText: {
    color: '#666',
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

