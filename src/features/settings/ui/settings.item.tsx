import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../shared/styles/theme';

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  color?: string;
}

export const SettingsItem = ({ 
  title, 
  subtitle, 
  onPress, 
  rightElement, 
  showChevron = true,
  color = colors.text 
}: SettingsItemProps) => (
  <TouchableOpacity 
    style={styles.item} 
    onPress={onPress} 
    activeOpacity={0.7}
    disabled={!onPress}
  >
    <View style={styles.itemContent}>
      <Text style={[styles.itemTitle, { color }]}>{title}</Text>
      {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
    </View>
    <View style={styles.itemRight}>
      {rightElement}
      {showChevron && onPress && (
        <Text style={styles.chevron}>›</Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...typography.body,
    color: colors.text,
  },
  itemSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  chevron: {
    fontSize: 20,
    color: colors.textSecondary,
  },
});