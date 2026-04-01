import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SettingsItemProps {
  title: string;
  subtitle?: string;  
  onPress?: () => void;
  rightElement?: React.ReactNode;
  color?: string;
  showChevron?: boolean;
}

export const SettingsItem = ({ 
  title, 
  subtitle,  
  onPress, 
  rightElement, 
  color = '#000',
  showChevron = true 
}: SettingsItemProps) => {
  const Content = () => (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}  
      </View>
      <View style={styles.rightContainer}>
        {rightElement}
        {showChevron && !rightElement && <Text style={styles.chevron}>›</Text>}
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
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rightContainer: {
    marginLeft: 10,
  },
  chevron: {
    color: '#999',
    fontSize: 18,
  },
});