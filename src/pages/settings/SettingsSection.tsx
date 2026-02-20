import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
});

