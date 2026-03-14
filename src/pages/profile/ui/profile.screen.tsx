import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { profileStyles } from './profile.styles';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={profileStyles.container}>
      {/* заголовок */}
      <View style={profileStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={profileStyles.backButton}>←</Text>
        </TouchableOpacity>
    
        <Text style={profileStyles.title}>Вы</Text>
    
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={profileStyles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* аватарка и данные */}
      <View style={profileStyles.profileHeader}>
        <View style={profileStyles.avatarContainer}>
          <Text style={profileStyles.avatarText}>👤</Text>
        </View>
        <View style={profileStyles.userInfo}>
          <Text style={profileStyles.userName}>Петька Иванов</Text>
          <Text style={profileStyles.userId}>id 75354096</Text>
        </View>
      </View>

      {/* меню */}
      <View style={profileStyles.menuContainer}>
        <MenuItem title="Мой аккаунт" onPress={() => navigation.navigate('Settings')} />
        {/* <MenuItem title="Push уведомления" onPress={() => {}} /> */}
        {/* <MenuItem title="Поддержка" onPress={() => {}} /> */}
        {/* <MenuItem title="Разработчики" onPress={() => navigation.navigate('Developers')} /> */}
        {/* <MenuItem title="Версия" onPress={() => {}} /> */}
      </View>
    </SafeAreaView>
  );
};

// компонент пункта меню
const MenuItem = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={profileStyles.menuItem} onPress={onPress}>
    <Text style={profileStyles.menuItemText}>{title}</Text>
    <Text style={profileStyles.menuItemArrow}>›</Text>
  </TouchableOpacity>
);