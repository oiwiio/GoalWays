import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const DevelopersScreen = () => {
  const navigation = useNavigation();
  const team = [
    {
      role: 'Дизайнер',
      name: 'Щиголев Иосиф',
      description: 'UI/UX, мокапы, пользовательские сценарии',
      contact: '@Iosik123',
      contactUrl: 'https://t.me/@Iosik123',
    },
    {
      role: 'Фронтенд-разработчик',
      name: 'Колеватов Георгий',
      description: 'React Native, архитектура, навигация',
      contact: '@oiwiio',
      contactUrl: 'https://t.me/@oiwiio',
    },
    {
      role: 'Бэкенд-разработчик',
      name: 'Абичкин Никита',
      description: 'Node.js / Python',
      contact: '@RUSSIAN_BERSERK',
      contactUrl: 'https://t.me/@RUSSIAN_BERSERK',
    },
  ];

  const handleContactPress = (url) => {
    if (url && url !== '—') {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 20 }}>
      <Text style={{ 
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 10,
        color: '#1a1a1a'
      }}>
        Команда GoalWays
      </Text>
      
      <Text style={{ 
        fontSize: 16, 
        color: '#666', 
        marginBottom: 30,
        lineHeight: 22 
      }}>
        Приложение разрабатывается студентами для учебного проекта.
        Каждый вносит свой вклад в общее дело.
      </Text>

      {team.map((member, index) => (
        <View 
          key={index}
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: '#eee',
          }}
        >
          {/* Роль */}
          <Text style={{ 
            fontSize: 14, 
            color: '#007AFF', 
            fontWeight: '600',
            marginBottom: 5 
          }}>
            {member.role}
          </Text>
          
          {/* Имя */}
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            marginBottom: 8,
            color: '#1a1a1a'
          }}>
            {member.name}
          </Text>
          
          {/* Описание */}
          <Text style={{ 
            fontSize: 15, 
            color: '#666', 
            marginBottom: 12,
            lineHeight: 20
          }}>
            {member.description}
          </Text>
          
          {/* Контакт (Telegram) */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0'
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: '#888', 
              marginRight: 8 
            }}>
              Контакт:
            </Text>
            
            {member.contactUrl ? (
              <TouchableOpacity onPress={() => handleContactPress(member.contactUrl)}>
                <Text style={{ 
                  fontSize: 15, 
                  color: '#0088cc',
                  textDecorationLine: 'underline'
                }}>
                  {member.contact}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ fontSize: 15, color: '#888' }}>
                {member.contact}
              </Text>
            )}
          </View>
        </View>
      ))}

      {/* Подпись внизу */}
      <Text style={{ 
        fontSize: 14, 
        color: '#999', 
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30
      }}>
        © 2025 GoalWays. Учебный проект.
      </Text>
    </ScrollView>
  );
};

export default DevelopersScreen;