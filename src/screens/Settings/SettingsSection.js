import React from 'react';
import { View, Text } from 'react-native';

const SettingsSection = ({ title, children }) => {
  return (
    <View style={{ marginBottom: 20, marginHorizontal: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#666', marginBottom: 8 }}>
        {title}
      </Text>
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden' }}>
        {children}
      </View>
    </View>
  );
};

export default SettingsSection;

