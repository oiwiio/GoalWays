import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../../shared/styles/theme';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.l,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.textSecondary,
    marginHorizontal: spacing.l,
    marginBottom: spacing.s,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    marginHorizontal: spacing.m,
    overflow: 'hidden',
  },
});