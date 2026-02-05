import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SettingsItem = ({ title, onPress, rightElement }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{ 
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}
    >
      <Text style={{ fontSize: 16 }}>{title}</Text>
      {rightElement ? rightElement : <Text style={{ color: '#999' }}>›</Text>}
    </TouchableOpacity>
  );
};

export default SettingsItem;
