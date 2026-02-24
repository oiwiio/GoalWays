import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


type SettingsItemProps = {
  title: string;
  onPress?: () => void; 
  rightElement?: React.ReactNode; 
  color?: string;
};

export const SettingsItem = ({ title, onPress, rightElement, color = '#000' }: SettingsItemProps) => {
  const Content = () => (
    <View style={styles.container}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      <View style={styles.rightContainer}>
        {rightElement ? rightElement : <Text style={styles.chevron}>›</Text>}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Content />
      </TouchableOpacity>
    );
  }

  return <Content />;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
  },
  rightContainer: {
    marginLeft: 10,
  },
  chevron: {
    color: '#999',
    fontSize: 18,
  },
});

