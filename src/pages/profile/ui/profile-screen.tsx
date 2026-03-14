import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { profileStyles} from './profile-styles';  

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={profileStyles.container}>
      <Text style={profileStyles.title}>Вы</Text>

      <View style={profileStyles.avatarContainer}>
        <Text style={profileStyles.avatarText}>👤</Text>
      </View>

      <View style={profileStyles.infoContainer}>
        <Text style={profileStyles.label}>Имя пользователя</Text>
        <Text style={profileStyles.value}>username_123</Text>

        <Text style={profileStyles.label}>ID</Text>
        <Text style={profileStyles.value}>user_12345</Text>
      </View>

      <TouchableOpacity 
        style={profileStyles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={profileStyles.settingsButtonText}>Настройки →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};